import express from "express";
import bmiCalculator from './bmiCalculator';

const app = express();

app.get('/hello', (_, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  const query = req.query; 
  if (query.height && query.weight) {
    const { height, weight } = bmiCalculator.parseQueryParams(String(query.height), String(query.weight));
    const message: String = bmiCalculator.calculateBmi(height, weight);

    res.json({
      message
    });

    return;
  } else {
    res.json({
      error: 'malformatted paramters'
    });
  }
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})