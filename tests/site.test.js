import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildSitemap,headMarkup,postPath,safeJson} from '../scripts/site-utils.js';
import handler,{validateContact} from '../api/contact.js';
import sharp from 'sharp';

test('XML and slugs cannot inject XML or additional route segments',()=>{
  assert.equal(postPath('research & learning'),'/blog/research%20%26%20learning');
  for (const slug of ['../secret','post?x=1','post#part','', ' post']) assert.throws(()=>postPath(slug));
  const xml = buildSitemap(['/','/'],[]);
  assert.equal((xml.match(/<loc>/g)||[]).length,1);
  assert.ok(!xml.includes('<lastmod>'));
  assert.ok(!safeJson(['</script>']).includes('</script>'));
});
test('preview and missing pages stay noindex; metadata is escaped',()=>{
  const meta={title:'Research <test>',description:'"quoted"',path:'/publications'};
  assert.match(headMarkup(meta,false),/noindex, nofollow/);
  assert.match(headMarkup({...meta,noindex:true},true),/noindex, nofollow/);
  assert.match(headMarkup(meta,true),/Research &lt;test&gt;/);
  assert.match(headMarkup(meta,true),/https:\/\/www.ronaldobal.com\/publications/);
});
test('contact validation requires consent, valid email and bounded input',()=>{
  const body={name:'Ronald',email:'test@example.com',phone:'',message:'Hello',consent:true,privacyVersion:'2026-09-24'};
  assert.ok(validateContact(body));
  for(const change of [{consent:false},{email:'invalid'},{message:'x'.repeat(5001)},{privacyVersion:'old'},{name:''}]) assert.equal(validateContact({...body,...change}),null);
});
test('contact endpoint rejects cross-origin requests before storage',async()=>{
  let status;
  const res={setHeader(){},status(value){status=value;return this;},json(){return this;}};
  await handler({method:'POST',headers:{origin:'https://untrusted.example'}},res);
  assert.equal(status,403);
});
test('contact handler rejects missing consent without contacting storage',async()=>{
  let status;
  const res={setHeader(){},status(value){status=value;return this;},json(){return this;}};
  await handler({method:'POST',headers:{origin:'https://www.ronaldobal.com','content-type':'application/json'},body:{name:'Test',email:'test@example.com',phone:'',message:'Hello',consent:false}},res);
  assert.equal(status,400);
});
test('configured contact handler stores only validated data and handles throttling',async()=>{
  const keys=['SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY','CONTACT_HASH_SECRET','CONTACT_PRIVACY_READY','CONTACT_RETENTION_DAYS'];
  const previous=Object.fromEntries(keys.map(key=>[key,process.env[key]]));
  const originalFetch=globalThis.fetch;
  Object.assign(process.env,{SUPABASE_URL:'https://test.supabase.co',SUPABASE_SERVICE_ROLE_KEY:'test-server-only',CONTACT_HASH_SECRET:'x'.repeat(32),CONTACT_PRIVACY_READY:'true',CONTACT_RETENTION_DAYS:'90'});
  const req={method:'POST',headers:{origin:'https://www.ronaldobal.com','content-type':'application/json','x-vercel-forwarded-for':'192.0.2.1'},body:{name:'Test',email:'test@example.com',phone:'',message:'Test enquiry',consent:true,privacyVersion:'2026-09-24',unexpected:'never store'}};
  let status,payload;
  const res={setHeader(){},status(value){status=value;return this;},json(value){payload=value;return this;}};
  try {
    globalThis.fetch=async(_url,options)=>{
      const body=JSON.parse(options.body);
      assert.equal(body.p_retention_days,90);
      assert.ok(!options.body.includes('192.0.2.1'));
      assert.ok(!options.body.includes('never store'));
      return {ok:true,json:async()=>true};
    };
    await handler(req,res);assert.equal(status,200);assert.equal(payload.ok,true);
    globalThis.fetch=async()=>({ok:true,json:async()=>false});
    await handler(req,res);assert.equal(status,429);
    globalThis.fetch=async()=>{throw new Error('private database detail');};
    await handler(req,res);assert.equal(status,503);assert.ok(!JSON.stringify(payload).includes('private database detail'));
  } finally {
    globalThis.fetch=originalFetch;
    for(const key of keys){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key];}
  }
});
test('all sitemap pages contain content, unique metadata, one main and one h1',()=>{
  const xml=fs.readFileSync('dist/sitemap.xml','utf8');
  const paths=[...xml.matchAll(/<loc>https:\/\/www.ronaldobal.com([^<]*)<\/loc>/g)].map(match=>match[1]);
  const titles=new Set();
  for(const route of paths){
    const html=fs.readFileSync(route==='/'?'dist/index.html':`dist${route}.html`,'utf8');
    assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,route+' h1');
    assert.equal((html.match(/<main(?:\s|>)/g)||[]).length,1,route+' main');
    assert.equal((html.match(/<title>/g)||[]).length,1,route+' title');
    const title=html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title),route+' duplicate title');titles.add(title);
    assert.ok(html.includes(`href="https://www.ronaldobal.com${route}"`),route+' canonical');
    assert.ok(html.includes('Privacy &amp; cookies'),route+' privacy link');
    assert.ok(!html.includes('<!--site-head-->'));
  }
  const config=JSON.parse(fs.readFileSync('.vercel/output/config.json','utf8'));
  assert.ok(config.routes.some(route=>route.status===404 && route.dest==='/404.html'));
  assert.match(fs.readFileSync('dist/404.html','utf8'),/noindex, nofollow/);
});
test('published photos have dimensions and no private metadata or originals',async()=>{
  const manifest=JSON.parse(fs.readFileSync('src/media-manifest.json','utf8'));
  for(const [original,image] of Object.entries(manifest)){
    assert.ok(!fs.existsSync('dist'+original),'Original exposed: '+original);
    const metadata=await sharp('dist'+image.src).metadata();
    assert.ok(!metadata.exif && !metadata.xmp && !metadata.iptc,image.src);
    assert.ok(metadata.width<=1280,image.src);
    assert.equal(metadata.width,image.width);
    assert.equal(metadata.height,image.height);
  }
});
