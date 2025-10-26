-- Initial schema for MediHub (moved into medihub project)
-- Using Supabase only for Postgres (no Supabase Auth)

create extension if not exists "uuid-ossp";

create table if not exists organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text,
  address jsonb,
  contact_email text,
  contact_phone text,
  services jsonb,
  verified boolean default false,
  logo_url text,
  created_at timestamptz default now()
);

create table if not exists organization_staff (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references organizations(id) on delete cascade,
  external_user_id text not null,
  email text,
  role text not null,
  active boolean default true,
  invited_by text,
  created_at timestamptz default now(),
  unique (organization_id, external_user_id)
);

create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references organizations(id) on delete cascade,
  name text not null,
  description text,
  metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists patients (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references organizations(id) on delete cascade,
  external_patient_id text,
  first_name text,
  last_name text,
  gender text,
  dob date,
  height_cm integer,
  weight_kg integer,
  bmi numeric,
  allergies jsonb,
  address jsonb,
  contact jsonb,
  metadata jsonb,
  created_by text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_patients_org ON patients (organization_id);
create index if not exists idx_patients_name ON patients (last_name, first_name);

create table if not exists patient_documents (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references patients(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,
  storage_path text,
  file_type text,
  metadata jsonb,
  uploaded_by text,
  created_at timestamptz default now()
);

create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references organizations(id),
  user_id text,
  action text,
  target_table text,
  target_id text,
  details jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_audit_org ON audit_logs (organization_id);

-- Sample seed row for local dev
insert into organizations (id, name, type, contact_email, verified)
select uuid_generate_v4(), 'Demo Clinic', 'Clinic', 'admin@democlinic.local', true
where not exists (select 1 from organizations where name = 'Demo Clinic');
