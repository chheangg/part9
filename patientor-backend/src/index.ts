import express from 'express';
import cors from 'cors';

// Routes
import diagnoseRouter from './routes/diagnoseRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');

  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});