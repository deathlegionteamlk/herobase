# Architecture Overview

Herobase is designed as a collection of microservices that share a central PostgreSQL database.

## Components

### 1. PostgreSQL (The Brain)
All data, including user accounts, application data, and storage metadata, lives in Postgres. We use:
- **pgvector**: For similarity search and AI applications.
- **Logical Replication & NOTIFY**: To power the Realtime engine.
- **Row Level Security (RLS)**: To handle granular permissions directly at the database level.

### 2. PostgREST & PostGraphile (The Arms)
These services automatically inspect your database schema and generate secure REST and GraphQL APIs. You don't need to write boilerplate CRUD code.

### 3. GoTrue (The Gatekeeper)
An API-based authentication system that handles JWT issuance, email verification, and third-party logins.

### 4. Realtime (The Messenger)
A Node.js service that listens for Postgres `NOTIFY` events and broadcasts them to clients via WebSockets.

### 5. Storage (The Vault)
A service that manages file uploads to MinIO (S3-compatible). It enforces ownership and permissions based on the user's JWT.

### 6. Functions (The Logic)
A runner that executes custom Node.js code snippets in an isolated `vm2` environment, allowing for complex backend logic without maintaining a full server.
