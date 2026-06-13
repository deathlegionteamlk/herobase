# Herobase 🚀

**Herobase** is an open-source, high-performance alternative to Firebase, built entirely around the power of **PostgreSQL**. It provides a complete backend-as-a-service (BaaS) solution out of the box, designed for developers who want the flexibility of SQL with the ease of a modern platform.

---

## ✨ Features

- **🐘 PostgreSQL Core**: Robust, ACID-compliant database with `pgvector` for AI and vector embeddings.
- **⚡ Auto-generated APIs**: 
    - **REST API**: Instant, secure endpoints via PostgREST.
    - **GraphQL API**: Fully featured GraphQL schema via PostGraphile.
- **🔐 Built-in Authentication**: Complete user management (sign-ups, logins, social auth) using GoTrue, integrated with Postgres Row Level Security (RLS).
- **📡 Realtime Subscriptions**: Listen to database changes live via WebSockets.
- **📂 File Storage**: Secure file management and uploads, backed by S3-compatible MinIO.
- **🏃 Edge Functions**: Run custom serverless backend logic in secure isolated Node.js environments.
- **🖥️ Management Dashboard**: A modern web-based UI built with Next.js to manage your tables, users, and services.
- **📦 Self-Hostable**: Simple deployment anywhere using Docker and Docker Compose.

---

## 🏗️ Architecture

Herobase is composed of several independent services that work together seamlessly:

- **Database**: PostgreSQL 16 + pgvector.
- **Auth**: GoTrue (the same engine powering Supabase Auth).
- **REST API**: PostgREST.
- **GraphQL API**: PostGraphile.
- **Realtime**: Node.js service using Postgres NOTIFY.
- **Storage**: Node.js API + MinIO S3 backend.
- **Functions**: Node.js runner with isolated VM execution.
- **Dashboard**: Next.js (App Router).

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/deathlegionteamlk/herobase.git
    cd herobase
    ```

2.  **Start the platform**:
    ```bash
    docker-compose up -d
    ```

3.  **Access the Dashboard**:
    Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 📖 Documentation

- [Architecture Overview](./ARCHITECTURE.md)
- [Database & APIs Guide](./docs/database.md)
- [Authentication & Permissions](./docs/auth.md)
- [Realtime Subscriptions](./docs/realtime.md)
- [File Storage](./docs/storage.md)
- [Edge Functions](./docs/functions.md)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) to get started.

## 🛡️ License

Herobase is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

**Developed by deathlegionteam**
