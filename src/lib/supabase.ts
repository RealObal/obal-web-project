import type { ContactForm } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export async function submitContactForm(formData: ContactForm) {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message: 'Contact form storage is not configured. Please contact me directly via email.',
    };
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase
      .from('contact_submissions')
      .insert([formData]);

    if (error) {
      return { ok: false, message: error.message };
    }

    return { ok: true, message: 'Message sent successfully.' };
  } catch (error) {
    console.warn('[supabase] contact submission failed.', error);
    return {
      ok: false,
      message: 'Failed to send message. Please contact me directly via email.',
    };
  }
}
