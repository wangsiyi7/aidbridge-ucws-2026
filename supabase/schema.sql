create extension if not exists pgcrypto;

create table if not exists public.aidbridge_action_packs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'aidbridge-browser',
  case_ref text,
  location text,
  channel text,
  language text,
  operator_mode text,
  urgency int not null,
  confidence int not null,
  risk_band text not null,
  detected_needs jsonb not null default '[]'::jsonb,
  resources jsonb not null default '[]'::jsonb,
  first_response text,
  redacted_summary text,
  field_pack text,
  evaluation jsonb not null default '{}'::jsonb,
  impact jsonb not null default '{}'::jsonb,
  launch jsonb not null default '{}'::jsonb,
  flow jsonb not null default '{}'::jsonb
);

create table if not exists public.aidbridge_ops_desks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'aidbridge-browser',
  open_cases int not null,
  critical_cases int not null,
  average_urgency int not null,
  minutes_saved int not null,
  matched_routes int not null,
  resource_pressure text not null,
  next_case_id text,
  queue jsonb not null default '[]'::jsonb,
  resource_load jsonb not null default '[]'::jsonb,
  bottlenecks jsonb not null default '[]'::jsonb,
  ops_brief text
);

create index if not exists aidbridge_action_packs_created_at_idx
  on public.aidbridge_action_packs (created_at desc);

create index if not exists aidbridge_action_packs_urgency_idx
  on public.aidbridge_action_packs (urgency desc);

create index if not exists aidbridge_ops_desks_created_at_idx
  on public.aidbridge_ops_desks (created_at desc);

alter table public.aidbridge_action_packs enable row level security;
alter table public.aidbridge_ops_desks enable row level security;

drop policy if exists "AidBridge demo insert action packs" on public.aidbridge_action_packs;
drop policy if exists "AidBridge demo read action packs" on public.aidbridge_action_packs;
drop policy if exists "AidBridge demo insert ops desks" on public.aidbridge_ops_desks;
drop policy if exists "AidBridge demo read ops desks" on public.aidbridge_ops_desks;

create policy "AidBridge demo insert action packs"
  on public.aidbridge_action_packs
  for insert
  to anon
  with check (source = 'aidbridge-browser');

create policy "AidBridge demo read action packs"
  on public.aidbridge_action_packs
  for select
  to anon
  using (source = 'aidbridge-browser');

create policy "AidBridge demo insert ops desks"
  on public.aidbridge_ops_desks
  for insert
  to anon
  with check (source = 'aidbridge-browser');

create policy "AidBridge demo read ops desks"
  on public.aidbridge_ops_desks
  for select
  to anon
  using (source = 'aidbridge-browser');

