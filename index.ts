import express from "express";
import bmiCalculator from './bmiCalculator';
import { isNotNumber } from "./utils";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get('/hello', (_, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const query = req.query; 
  if (query.height && query.weight) {
    const { height, weight } = bmiCalculator.parseQueryParams(String(query.height), String(query.weight));
    const message: string = bmiCalculator.calculateBmi(height, weight);

    res.json({
      message
    });

    return;
  } else {
    res.json({
      error: 'malformatted paramters'
    });
  }
});

app.post('/exercise', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    return res.json({
      error: 'parameters missing'
    });
  }

  if (!(dailyExercises instanceof Array)) {
    return res.json({ error: 'malformatted parameters'});
  }

  const assertedDailyExercises = dailyExercises as unknown[];

  let error = false;
  assertedDailyExercises.forEach((input: unknown) => isNotNumber(input) ? error = true : null);

  if (error || isNotNumber(target)) return res.json({ error: 'malformatted parameters'});

  const parsedTarget = Number(target);
  const parsedExercises: number[] = assertedDailyExercises.map((input: unknown) => Number(input)); 

  const result = calculateExercises(parsedExercises, parsedTarget);

  return res.json({
    result
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});