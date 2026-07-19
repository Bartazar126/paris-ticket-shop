-- Paris Ticket Shop tables

create table if not exists public.pts_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.pts_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text,
  price numeric(10,2),
  original_price numeric(10,2),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pts_bookings (
  id uuid primary key default gen_random_uuid(),
  product_slug text not null,
  product_title text not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  adults int not null default 1 check (adults >= 0),
  children int not null default 0 check (children >= 0),
  infants int not null default 0 check (infants >= 0),
  total_amount numeric(10,2) not null default 0,
  currency text not null default 'EUR',
  status text not null default 'pending',
  selections jsonb not null default '[]'::jsonb,
  stripe_session_id text,
  stripe_payment_intent text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.pts_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.pts_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  path text not null,
  views int not null default 0,
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pts_attraction_closures (
  id uuid primary key default gen_random_uuid(),
  attraction_id text not null,
  closed_date date not null,
  closed_times text[] null,
  note text null,
  created_at timestamptz not null default now(),
  unique (attraction_id, closed_date)
);

create index if not exists pts_bookings_created_at_idx on public.pts_bookings (created_at desc);
create unique index if not exists pts_bookings_stripe_session_id_uidx
  on public.pts_bookings (stripe_session_id)
  where stripe_session_id is not null;
create index if not exists pts_articles_views_idx on public.pts_articles (views desc);
create index if not exists pts_products_slug_idx on public.pts_products (slug);
create index if not exists pts_attraction_closures_attraction_date_idx
  on public.pts_attraction_closures (attraction_id, closed_date);

create or replace function public.is_pts_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.pts_admins
    where user_id = auth.uid()
      and is_active = true
  );
$$;

revoke all on function public.is_pts_admin() from public;
grant execute on function public.is_pts_admin() to authenticated;

alter table public.pts_admins enable row level security;
alter table public.pts_products enable row level security;
alter table public.pts_bookings enable row level security;
alter table public.pts_articles enable row level security;
alter table public.pts_attraction_closures enable row level security;
alter table public.pts_settings enable row level security;

drop policy if exists "pts_admins_select_self_or_admin" on public.pts_admins;
drop policy if exists "pts_admins_all_admin" on public.pts_admins;
drop policy if exists "pts_products_public_read" on public.pts_products;
drop policy if exists "pts_products_admin_write" on public.pts_products;
drop policy if exists "pts_bookings_admin_select" on public.pts_bookings;
drop policy if exists "pts_bookings_admin_update" on public.pts_bookings;
drop policy if exists "pts_bookings_anon_insert" on public.pts_bookings;
drop policy if exists "pts_articles_public_read" on public.pts_articles;
drop policy if exists "pts_articles_admin_write" on public.pts_articles;
drop policy if exists "pts_attraction_closures_public_read" on public.pts_attraction_closures;
drop policy if exists "pts_attraction_closures_admin_write" on public.pts_attraction_closures;
drop policy if exists "pts_settings_admin_all" on public.pts_settings;

create policy "pts_admins_select_self_or_admin"
  on public.pts_admins for select to authenticated
  using (user_id = auth.uid() or public.is_pts_admin());

create policy "pts_admins_all_admin"
  on public.pts_admins for all to authenticated
  using (public.is_pts_admin())
  with check (public.is_pts_admin());

create policy "pts_products_public_read"
  on public.pts_products for select to anon, authenticated
  using (is_active = true or public.is_pts_admin());

create policy "pts_products_admin_write"
  on public.pts_products for all to authenticated
  using (public.is_pts_admin())
  with check (public.is_pts_admin());

create policy "pts_bookings_admin_select"
  on public.pts_bookings for select to authenticated
  using (public.is_pts_admin());

create policy "pts_bookings_admin_update"
  on public.pts_bookings for update to authenticated
  using (public.is_pts_admin())
  with check (public.is_pts_admin());

create policy "pts_bookings_anon_insert"
  on public.pts_bookings for insert to anon, authenticated
  with check (true);

create policy "pts_articles_public_read"
  on public.pts_articles for select to anon, authenticated
  using (true);

create policy "pts_articles_admin_write"
  on public.pts_articles for all to authenticated
  using (public.is_pts_admin())
  with check (public.is_pts_admin());

create policy "pts_attraction_closures_public_read"
  on public.pts_attraction_closures for select to anon, authenticated
  using (true);

create policy "pts_attraction_closures_admin_write"
  on public.pts_attraction_closures for all to authenticated
  using (public.is_pts_admin())
  with check (public.is_pts_admin());

create policy "pts_settings_admin_all"
  on public.pts_settings for all to authenticated
  using (public.is_pts_admin())
  with check (public.is_pts_admin());

grant usage on schema public to anon, authenticated;
grant select on public.pts_products to anon, authenticated;
grant select, insert on public.pts_bookings to anon, authenticated;
grant select, update, delete on public.pts_bookings to authenticated;
grant select on public.pts_articles to anon, authenticated;
grant select on public.pts_attraction_closures to anon, authenticated;
grant select, insert, update, delete on public.pts_settings to authenticated, service_role;
grant select, insert, update on public.pts_bookings to service_role;
grant insert, update, delete on public.pts_products to authenticated;
grant insert, update, delete on public.pts_articles to authenticated;
grant insert, update, delete on public.pts_attraction_closures to authenticated;
grant select, insert, update, delete on public.pts_admins to authenticated;

insert into public.pts_articles (title, slug, path, views, published_at) values
  ('Privacy Policy', 'privacy-policy', '/privacy-policy', 12836, '2022-09-02 14:48:30+00'),
  ('Terms and Conditions', 'terms-and-conditions', '/terms-and-conditions', 11552, '2022-09-02 14:48:30+00'),
  ('Refund Policy', 'refund-policy', '/refund-policy', 4591, '2023-06-24 22:09:18+00'),
  ('The Panthéon, known as temple to the gods located in Paris', 'the-pantheon-known-as-temple-to-the-gods-located-in-paris', '/blog/the-pantheon-known-as-temple-to-the-gods-located-in-paris', 2254, '2022-09-02 14:48:31+00'),
  ('The Eiffel Tower is the iron treasure of Paris', 'the-eiffel-tower-is-the-iron-treasure-of-paris', '/blog/the-eiffel-tower-is-the-iron-treasure-of-paris', 2227, '2022-09-02 14:48:31+00')
on conflict (slug) do nothing;

notify pgrst, 'reload schema';
