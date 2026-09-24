import type { ContactForm } from '../types';
export const isSupabaseConfigured = import.meta.env.VITE_CONTACT_ENABLED === 'true';
export async function submitContactForm(formData: ContactForm) {
  if (!isSupabaseConfigured) return {ok:false,message:'Please email ronaldobal20@gmail.com to send your enquiry.'};
  if (!formData.consent) return {ok:false,message:'Please confirm permission to process your enquiry.'};
  try {
    const response = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...formData,privacyVersion:'2026-09-24'}),signal:AbortSignal.timeout(15000)});
    const result = await response.json();
    return {ok:response.ok && result.ok === true,message:typeof result.message === 'string' ? result.message : 'Unable to send your message.'};
  } catch {return {ok:false,message:'Unable to send your message. Please email ronaldobal20@gmail.com.'};}
}
