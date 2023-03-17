import { isNotNumber } from "./utils";

type Star = 1 | 2 | 3;

interface ParsedResult {
  target: number,
  exercises: number[],
}

interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: Star,
  ratingDescription: string,
}

const parseArguments = (args: string[]): ParsedResult => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let error: boolean = false;

  args.slice(2).forEach(input => isNotNumber(input) ? error = true : null);

  if (error) throw new Error('Invalid inputs');

  const target: number = Number(args[2]);
  const numArgs: number[] = args.slice(3).map(input => Number(input)); 

  console.log(target, numArgs)

  return {
    target,
    exercises: numArgs,
  }
}

const calculateExercises = (hours: number[], target: number): ExerciseResult => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter(hour => hour > 0).length;
  const average: number = hours.reduce((prev, next) => prev + next) / periodLength;
  const success: boolean = average > target;
  let rating: Star;
  let ratingDescription: string;

  if (average < target) {
    rating = 1;
    ratingDescription = 'Bad';
  } else if (average === target) {
    rating = 2;
    ratingDescription = 'Okay';
  } else if (average > target) {
    rating = 3;
    ratingDescription = 'Good';
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription
  }
}

try {
  const { target, exercises } = parseArguments(process.argv);
  console.log(calculateExercises(exercises, target));
} catch(error: unknown) {
  let errorMessage = 'An error has occured:';
  if (error instanceof Error) {
    errorMessage += error.message;
  }

  console.log(errorMessage)
}