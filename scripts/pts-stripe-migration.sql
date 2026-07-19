-- Stripe settings + booking payment columns

create table if not exists public.pts_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.pts_bookings
  add column if not exists stripe_session_id text,
  add column if not exists stripe_payment_intent text,
  add column if not exists paid_at timestamptz;

create unique index if not exists pts_bookings_stripe_session_id_uidx
  on public.pts_bookings (stripe_session_id)
  where stripe_session_id is not null;

alter table public.pts_settings enable row level security;

drop policy if exists "pts_settings_admin_all" on public.pts_settings;
create policy "pts_settings_admin_all"
  on public.pts_settings for all to authenticated
  using (public.is_pts_admin())
  with check (public.is_pts_admin());

grant select, insert, update, delete on public.pts_settings to authenticated, service_role;
grant select, insert, update on public.pts_bookings to service_role;

notify pgrst, 'reload schema';
