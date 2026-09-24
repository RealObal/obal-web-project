import { timingSafeEqual } from 'node:crypto';
export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  if (req.method !== 'POST') {res.setHeader('Allow','POST');return res.status(405).end();}
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  const hook = process.env.VERCEL_DEPLOY_HOOK;
  if (!secret || secret.length < 32 || !hook?.startsWith('https://api.vercel.com/v1/integrations/deploy/')) return res.status(503).end();
  const expected = Buffer.from(`Bearer ${secret}`);
  const supplied = Buffer.from(String(req.headers.authorization || ''));
  if (supplied.length !== expected.length || !timingSafeEqual(supplied,expected)) return res.status(401).end();
  try {
    const response = await fetch(hook,{method:'POST',signal:AbortSignal.timeout(10000)});
    return res.status(response.ok ? 202 : 503).json({accepted:response.ok});
  } catch {return res.status(503).json({accepted:false});}
}
