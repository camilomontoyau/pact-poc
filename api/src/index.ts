import express from 'express';

const app = express();

const PORT = 3000;

app.get('/', (_req, res) => {
  res.status(200).send('Hello World');
});

app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from API' });
});

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
});
