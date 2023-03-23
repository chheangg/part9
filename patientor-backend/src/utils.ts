import { Gender, NewPatient } from "./types";



const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
}

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
}

const parseString = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error('Incorrect or missing data type');
  }

  return param;
}

const parseDob = (param: unknown): string => {
  if (!isString(param) || !isDate(param)) {
    throw new Error('Incorrect or missing date');
  }

  return param;
}

const parseGender = (param: unknown): Gender => {
  if (!isString(param) || !isGender(param)) {
    throw new Error('Incorrect or missing gender:' + param);
  }

  return param;
}

const toNewPatient = (object: any): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object && 'dateOfBirth' in object && 'ssn' in object &&
    'gender' in object && 'occupation' in object
    ) {
      return {
        name: parseString(object.name),
        dateOfBirth: parseDob(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
      }
    }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;