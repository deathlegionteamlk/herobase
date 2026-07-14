<div align="center">

<!-- Animated hero banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Herobase&fontSize=80&fontColor=ffffff&fontAlignY=35&desc=PostgreSQL-powered%20backend%2C%20without%20the%20vendor%20lock-in&descAlignY=60&descSize=18&animation=fadeIn" width="100%"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=800&color=6366F1&center=true&vCenter=true&multiline=true&width=600&height=80&lines=Open-source+Firebase+alternative.;Built+on+PostgreSQL.;Self-host+everything." alt="Typing SVG" />

<br/><br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-6366f1.svg?style=for-the-badge)](./LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Ready-0ea5e9?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Built with ❤️](https://img.shields.io/badge/Built%20by-deathlegionteam-ef4444?style=for-the-badge)](https://github.com/deathlegionteamlk)

</div>

---

## 🧠 What is Herobase?

Firebase is convenient until it isn't — until the pricing changes, until you hit a query limitation, until you want to run a `JOIN`. Herobase is the escape hatch.

It's a self-hosted backend platform built entirely on **PostgreSQL**. You get the stuff Firebase gives you — auth, realtime, file storage, serverless functions — except it's all running on your own infra, in a real relational database you actually control.

No proprietary query language. No vendor lock-in. Just Postgres with a full BaaS stack around it.

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700"/>
</div>

---

## ✨ Features

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="100" />
</div>

<table>
<tr>
<td width="50%">

### 🐘 PostgreSQL Core
The whole thing runs on Postgres 16. ACID-compliant, battle-tested, and extended with `pgvector` for vector embeddings and AI workloads. If you know SQL, you already know how to query your data.

### ⚡ Auto-generated APIs
Write a table, get an API. PostgREST generates secure REST endpoints and PostGraphile handles GraphQL — both directly from your schema. No boilerplate, no code generation step.

### 🔐 Built-in Auth
User signups, logins, social auth — powered by GoTrue, the same auth engine behind Supabase. It integrates with Postgres Row Level Security, so your access rules live in the database where they belong.

### 📡 Realtime Subscriptions
Listen to database changes live over WebSockets. Insert a row, and your connected clients know about it immediately.

</td>
<td width="50%">

### 📂 File Storage
Upload and serve files through a Node.js API backed by MinIO — S3-compatible, self-hosted, no AWS account needed.

### 🏃 Edge Functions
Run custom backend logic in isolated Node.js environments. Webhooks, background jobs, custom endpoints — whatever Postgres alone can't handle.

### 🖥️ Management Dashboard
A Next.js web UI to manage your tables, users, stored files, and services. You shouldn't need to open `psql` for day-to-day admin work.

### 📦 Self-hostable
The whole stack runs with `docker-compose up`. One command, your own machine, no external services required.

</td>
</tr>
</table>

---

## 🏗️ Architecture

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif" width="400"/>

</div>

Herobase is a set of independent services that each do one thing. They talk to each other, but you can swap any of them out if you have a reason to.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Herobase Stack                          │
├───────────────┬───────────────┬───────────────┬─────────────────┤
│  🐘 Database  │  🔐 Auth      │  ⚡ REST API  │  🌐 GraphQL API │
│  Postgres 16  │  GoTrue       │  PostgREST    │  PostGraphile   │
│  + pgvector   │               │               │                 │
├───────────────┼───────────────┼───────────────┼─────────────────┤
│  📡 Realtime  │  📂 Storage   │  🏃 Functions │  🖥️ Dashboard   │
│  Node.js +    │  Node.js API  │  Node.js VM   │  Next.js        │
│  PG NOTIFY    │  + MinIO      │  Runner       │  App Router     │
└───────────────┴───────────────┴───────────────┴─────────────────┘
```

Each service is independently deployable. The dashboard talks to them all. Postgres is the source of truth for everything — even the auth and realtime layers run on top of it.

---

## 🚀 Getting Started

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif" width="400"/>
</div>

You need Docker and Docker Compose installed. That's it.

### 1 — Clone the repo

```bash
git clone https://github.com/deathlegionteamlk/herobase.git
cd herobase
```

### 2 — Start everything

```bash
docker-compose up -d
```

This pulls the images and boots all eight services. First run takes a couple of minutes. After that it's fast.

### 3 — Open the dashboard

```
http://localhost:3001
```

From there you can create tables, manage users, browse stored files, and deploy functions through the UI.

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="50" />
&nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="50" />
&nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="50" />
</div>

---

## 📖 Documentation

| Document | What's in it |
|---|---|
| [🏗️ Architecture Overview](./ARCHITECTURE.md) | How the services fit together and why |
| [🐘 Database & APIs](./docs/database.md) | Working with Postgres, REST, and GraphQL |
| [🔐 Auth & Permissions](./docs/auth.md) | User management and Row Level Security |
| [📡 Realtime](./docs/realtime.md) | WebSocket subscriptions and NOTIFY |
| [📂 File Storage](./docs/storage.md) | Uploading and serving files via MinIO |
| [🏃 Edge Functions](./docs/functions.md) | Writing and deploying serverless logic |

---

## 🤝 Contributing

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="500"/>
</div>

PRs are welcome. If you've found a bug, have a feature idea, or want to improve the docs, take a look at the [Contributing Guide](./CONTRIBUTING.md) to get oriented before opening an issue.

---

## 🛡️ License

MIT — do what you want with it. See [LICENSE](./LICENSE) for the full text.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer&animation=fadeIn" width="100%"/>

**Built by [deathlegionteam](https://github.com/deathlegionteamlk)**

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=14&duration=4000&pause=1000&color=6366F1&center=true&vCenter=true&width=400&lines=PostgreSQL+was+right+all+along.;Self-host+everything.;Star+⭐+if+you+find+this+useful!" alt="Footer typing" />

</div>

<!-- DL Code Badge -->
![Status](https://img.shields.io/badge/status-active-success?style=flat-square)

