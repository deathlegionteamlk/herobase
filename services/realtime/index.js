const { Client } = require('pg');
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'herobase-secret-key-at-least-32-characters-long';
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgrespassword',
  database: process.env.DB_NAME || 'herobase',
};

const wss = new WebSocket.Server({ port: process.env.PORT || 4000 });

const pgClient = new Client(DB_CONFIG);

pgClient.connect();

pgClient.query('LISTEN realtime');

pgClient.on('notification', (msg) => {
  const payload = JSON.parse(msg.payload);
  console.log('New notification:', payload);
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    }
  });
});

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'auth') {
        const token = data.token;
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid token' }));
          } else {
            ws.user = decoded;
            ws.send(JSON.stringify({ type: 'auth_ok' }));
          }
        });
      }
    } catch (e) {
      console.error('Error processing message:', e);
    }
  });
});

console.log('Realtime service running on port 4000');
