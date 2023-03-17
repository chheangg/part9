type Star = 1 | 2 | 3;

interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: Star,
  ratingDescription: String,
}

const calculateExercises = (hours: number[], target: number): ExerciseResult => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter(hour => hour > 0).length;
  const average: number = trainingDays / periodLength;
  const success: boolean = average > target;
  let rating: Star;
  let ratingDescription: String;

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))