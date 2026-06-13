# Database & APIs

Herobase turns your Postgres schema into a full-featured API.

## Table Management
Any table you create in the `public` schema is automatically exposed via the APIs.

## REST API
- URL: `http://localhost:3000`
- Documentation: [PostgREST Docs](https://postgrest.org/)

## GraphQL API
- URL: `http://localhost:5000/graphql`
- Documentation: [PostGraphile Docs](https://www.graphile.org/postgraphile/)

## Vector Support
You can create vector columns for AI embeddings:
```sql
CREATE TABLE items (
  id serial primary key,
  embedding vector(1536)
);
```
