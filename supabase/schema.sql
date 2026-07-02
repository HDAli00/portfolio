-- Articles table
create table articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  description  text not null,
  content      text not null,
  published_at timestamptz not null default now(),
  published    boolean not null default false,
  created_at   timestamptz not null default now()
);

-- Projects table
create table projects (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text not null,
  stack        text[] not null default '{}',
  github_url   text not null,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

-- Highlights table (principles, projects, and articles in one editorial index)
create table highlights (
  id           uuid primary key default gen_random_uuid(),
  type         text not null check (type in ('principle', 'project', 'article')),
  topic        text,
  title        text not null,
  blurb        text not null,
  meta         text,
  href         text not null default '#',
  published    boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

-- Enable Row Level Security
alter table articles enable row level security;
alter table projects enable row level security;
alter table highlights enable row level security;

-- Public read access for published articles
create policy "Public can read published articles"
  on articles for select
  using (published = true);

-- Public read access for all projects
create policy "Public can read projects"
  on projects for select
  using (true);

-- Public read access for published highlights
create policy "Public can read published highlights"
  on highlights for select
  using (published = true);

-- Sample data
insert into projects (name, description, stack, github_url, sort_order) values
  ('otel-lab',                    'End-to-end OpenTelemetry pipeline: traces, metrics, and logs from a real service into Grafana.',      array['OpenTelemetry', 'Grafana', 'Docker'],         'https://github.com/HDAli00', 1),
  ('terraform-k8s-baseline',      'Opinionated Terraform modules for bootstrapping a production-grade Kubernetes cluster on AWS.',         array['Terraform', 'AWS', 'Kubernetes'],              'https://github.com/HDAli00', 2),
  ('databricks-pipeline-template','Reusable PySpark scaffolding with testing, lineage tracking, and CI hooks baked in.',                  array['PySpark', 'Databricks', 'GitHub Actions'],    'https://github.com/HDAli00', 3),
  ('platform-agent',              'An AI assistant for platform engineers that answers infra questions grounded in your own runbooks.',       array['Python', 'LLM', 'RAG'],                       'https://github.com/HDAli00', 4);

insert into highlights (type, topic, title, blurb, meta, href, sort_order) values
  ('principle', 'Observability',
   'A system should tell you it''s sick before you have to ask it.',
   'Replaced box-by-box SSH log-reading with a full telemetry stack deployed inside air-gapped VMs: one dashboard instead of the login-and-tail ritual.',
   'OpenTelemetry · Grafana · Prometheus · ASML', '/writing/opentelemetry-collector-production-architecture', 1),
  ('principle', 'Reproducibility',
   'If it only lives in the console, it doesn''t exist.',
   'A three-tier AWS application defined end to end as code. Standing it up or rebuilding from scratch is a command, not an act of memory.',
   'ECS Fargate · RDS · ElastiCache · Terraform / Terragrunt', '/writing/terraform-state-at-scale', 2),
  ('principle', 'Ephemerality',
   'Every run begins from nothing and leaves nothing behind.',
   'A CI pipeline where each run gets a single-use pod and volume, wiped on exit: the clean-state guarantee that made self-service shipping safe.',
   'Jenkins · Kubernetes · per-run PV teardown · ASML', '/writing/kubernetes-cpu-throttling-deep-dive', 3);
