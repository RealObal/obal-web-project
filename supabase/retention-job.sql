-- Run after enabling the pg_cron extension in Supabase.
-- Named cron.schedule replaces the schedule for an existing job of this name.
select cron.schedule(
  'portfolio-enquiry-retention',
  '0 2 * * *',
  $job$
    delete from public.portfolio_enquiries where expires_at < now();
    delete from public.portfolio_enquiry_limits where window_start < now()-interval '2 days';
  $job$
);
