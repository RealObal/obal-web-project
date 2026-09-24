-- Review and apply in the connected Supabase project before enabling the form.
-- This migration restricts legacy public access but does not delete existing records.
do $$ begin
  if to_regclass('public.contact_submissions') is not null then
    execute 'alter table public.contact_submissions enable row level security';
    execute 'revoke all on public.contact_submissions from anon, authenticated';
  end if;
end $$;
create table if not exists public.portfolio_enquiries (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null default '' check (char_length(phone) <= 40),
  message text not null check (char_length(message) between 1 and 5000),
  privacy_version text not null,
  consent_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create table if not exists public.portfolio_enquiry_limits (
  rate_key text primary key,
  window_start timestamptz not null default now(),
  attempts integer not null default 0
);
alter table public.portfolio_enquiries enable row level security;
alter table public.portfolio_enquiry_limits enable row level security;
revoke all on public.portfolio_enquiries, public.portfolio_enquiry_limits from anon, authenticated;

create or replace function public.submit_portfolio_enquiry(p_name text,p_email text,p_phone text,p_message text,p_rate_key text,p_retention_days integer,p_privacy_version text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare allowed integer;
begin
  if p_retention_days <> 90 or p_privacy_version <> '2026-09-24' then raise exception 'Invalid configuration'; end if;
  insert into public.portfolio_enquiry_limits(rate_key,attempts) values(p_rate_key,1)
  on conflict(rate_key) do update set
    attempts = case when public.portfolio_enquiry_limits.window_start < now()-interval '1 hour' then 1 else public.portfolio_enquiry_limits.attempts+1 end,
    window_start = case when public.portfolio_enquiry_limits.window_start < now()-interval '1 hour' then now() else public.portfolio_enquiry_limits.window_start end
  returning attempts into allowed;
  if allowed > 3 then return false; end if;
  insert into public.portfolio_enquiries(name,email,phone,message,privacy_version,expires_at)
  values(p_name,p_email,p_phone,p_message,p_privacy_version,now()+make_interval(days=>p_retention_days));
  return true;
end $$;
revoke all on function public.submit_portfolio_enquiry(text,text,text,text,text,integer,text) from public,anon,authenticated;
grant execute on function public.submit_portfolio_enquiry(text,text,text,text,text,integer,text) to service_role;

-- Enable pg_cron in Supabase, then schedule these statements daily through
-- Dashboard > Integrations > Cron (job name: portfolio-enquiry-retention):
-- delete from public.portfolio_enquiries where expires_at < now();
-- delete from public.portfolio_enquiry_limits where window_start < now()-interval '2 days';
-- Review legacy contact_submissions separately: ensure RLS is enabled and that
-- anon/authenticated have no SELECT, UPDATE or DELETE grants or policies.
