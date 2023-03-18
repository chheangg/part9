import { isNotNumber } from "./utils";

interface ParsedResult {
  height: number,
  weight: number,
}

const parseArguments = (args: string[]): ParsedResult => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Invalid inputs');
  }
}

const calculateBmi = (height: number, weight: number): String => {
  const bmi: number = weight / ((height / 100) ^ 2);
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi >= 16 && bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi >= 17 && bmi < 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (Healthy range)';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi >= 30 && bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi >= 35 && bmi < 40) {
    return 'Obese (Class II)';
  } else if (bmi >= 40) {
    return 'Obese (Class III';
  } else {
    throw new Error('Invalid inputs')
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch(error: unknown) {
  let errorMessage = 'An error has occured:';
  if (error instanceof Error) {
    errorMessage += error.message;
  }

  console.log(errorMessage)
}