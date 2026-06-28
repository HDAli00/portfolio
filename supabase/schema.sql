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

-- Enable Row Level Security
alter table articles enable row level security;
alter table projects enable row level security;

-- Public read access for published articles
create policy "Public can read published articles"
  on articles for select
  using (published = true);

-- Public read access for all projects
create policy "Public can read projects"
  on projects for select
  using (true);

-- Sample data
insert into projects (name, description, stack, github_url, sort_order) values
  ('otel-lab',                    'End-to-end OpenTelemetry pipeline — traces, metrics, and logs from a real service into Grafana.',      array['OpenTelemetry', 'Grafana', 'Docker'],         'https://github.com/HDAli00', 1),
  ('terraform-k8s-baseline',      'Opinionated Terraform modules for bootstrapping a production-grade Kubernetes cluster on AWS.',         array['Terraform', 'AWS', 'Kubernetes'],              'https://github.com/HDAli00', 2),
  ('databricks-pipeline-template','Reusable PySpark scaffolding with testing, lineage tracking, and CI hooks baked in.',                  array['PySpark', 'Databricks', 'GitHub Actions'],    'https://github.com/HDAli00', 3),
  ('platform-agent',              'An AI assistant for platform engineers — answers infra questions grounded in your own runbooks.',       array['Python', 'LLM', 'RAG'],                       'https://github.com/HDAli00', 4);
