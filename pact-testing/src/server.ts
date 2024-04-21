import express from 'express';

export const app = express();

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from API' });
});