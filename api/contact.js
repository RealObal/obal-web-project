import { createHmac } from 'node:crypto';

export function validateContact(body) {
  if (!body || typeof body !== 'object' || body.consent !== true || body.privacyVersion !== '2026-09-24') return null;
  const result = {};
  for (const [key,max] of Object.entries({name:100,email:254,phone:40,message:5000})) {
    if (typeof body[key] !== 'string') return null;
    const value = body[key].trim();
    if (value.length > max || (key !== 'phone' && !value) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) return null;
    result[key] = value;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) return null;
  return result;
}

export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return res.status(405).json({ok:false,message:'Method not allowed.'}); }
  const allowed = new Set(['https://ronaldobal.com','https://www.ronaldobal.com']);
  if (!allowed.has(req.headers.origin)) return res.status(403).json({ok:false,message:'Request not allowed.'});
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) return res.status(415).json({ok:false,message:'JSON required.'});
  if (Number(req.headers['content-length'] || 0) > 16000) return res.status(413).json({ok:false,message:'Message too large.'});
  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } catch { return res.status(400).json({ok:false,message:'Invalid message.'}); }
  if (Buffer.byteLength(JSON.stringify(body || {})) > 16000) return res.status(413).json({ok:false,message:'Message too large.'});
  const data = validateContact(body);
  if (!data) return res.status(400).json({ok:false,message:'Please check your details and consent.'});
  if (body.website) return res.status(200).json({ok:true,message:'Message received.'});
  const {SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, CONTACT_HASH_SECRET, CONTACT_PRIVACY_READY, CONTACT_RETENTION_DAYS} = process.env;
  const days = Number(CONTACT_RETENTION_DAYS || 90);
  if (CONTACT_PRIVACY_READY !== 'true' || !/^https:\/\/[^/]+\.supabase\.co$/.test(SUPABASE_URL || '') || !SUPABASE_SERVICE_ROLE_KEY || !CONTACT_HASH_SECRET || CONTACT_HASH_SECRET.length < 32 || days !== 90) {
    return res.status(503).json({ok:false,message:'Online enquiries are unavailable. Please email ronaldobal20@gmail.com.'});
  }
  const ip = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const key = createHmac('sha256',CONTACT_HASH_SECRET).update(`${new Date().toISOString().slice(0,10)}:${ip}`).digest('hex');
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_portfolio_enquiry`,{
      method:'POST',headers:{'Content-Type':'application/json',apikey:SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${SUPABASE_SERVICE_ROLE_KEY}`},
      body:JSON.stringify({p_name:data.name,p_email:data.email,p_phone:data.phone,p_message:data.message,p_rate_key:key,p_retention_days:days,p_privacy_version:body.privacyVersion}),signal:AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('Storage rejected request');
    const accepted = await response.json();
    if (accepted !== true) {res.setHeader('Retry-After','3600');return res.status(429).json({ok:false,message:'Too many messages. Please try again later.'});}
    return res.status(200).json({ok:true,message:'Message sent successfully.'});
  } catch {
    return res.status(503).json({ok:false,message:'Unable to send your message. Please try again later or email directly.'});
  }
}
