# Realtime

Listen to changes in your database in realtime.

## How it works
The Realtime service connects to your Postgres database and listens for `NOTIFY` events. When a change occurs (INSERT, UPDATE, DELETE), the database triggers a function that sends a notification.

## Usage
Connect to `ws://localhost:4000` and subscribe to your table events.
