# Authentication

Herobase uses JWT-based authentication.

## Flow
1. User signs up/in via the Dashboard or Auth API.
2. GoTrue issues a JWT.
3. The client includes this JWT in the `Authorization: Bearer <token>` header for all API requests.
4. Postgres uses the JWT to determine the user's role and identity, enforcing Row Level Security (RLS).

## Roles
- `anon`: Unauthenticated users.
- `authenticated`: Logged in users.
