import { Gender, NewPatient, Diagnose, EntryWithoutId, healthCheckRating, SickLeave, Discharge } from "./types";

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

const isNumber = (param: unknown): param is number => {
  return !isNaN(Number(param));
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

const isHealthCheckRating = (param: number): param is healthCheckRating => {
  return Object.values(healthCheckRating).map((v) => Number(v)).includes(param);
}

const parseHealthCheckRating = (param: unknown): healthCheckRating => {
  if (!isNumber(param) || !isHealthCheckRating(Number(param))) {
    throw new Error('Incorrect or missing ratings:' + param);
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

export const toNewEntry = (object: any): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object || 'diagnosesCodes' in object) {
    switch (object.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          return {
            description: parseString(object.description),
            date: parseDob(object.date),
            type: object.type,
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
        } else {
          throw new Error('Incorrect or missing data');
        }
      case 'OccupationalHealthcare':
        if ('employerName' in object) {
          return {
            description: parseString(object.description),
            date: parseDob(object.date),
            type: object.type,
            specialist: parseString(object.specialist),
            employerName: parseString(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
          };
        } else {
          throw new Error('Incorrect or missing data');
        }
      case 'Hospital':
        if ('discharge' in object) {
          return {
            description: parseString(object.description),
            date: parseDob(object.date),
            type: object.type,
            specialist: parseString(object.specialist),
            discharge: parseDischarge(object.discharge),
          };
        } else {
          throw new Error('Incorrect or missing data');
        }
      default:
        throw new Error('Incorrect or missing data');
    }
  }

  throw new Error('Incorrect data: some fields are missing');
}

export const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

export const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if(!sickLeave || typeof sickLeave !== 'object'
    || !('startDate' in sickLeave && 'endDate' in sickLeave)) {
    return {} as SickLeave;
  }

  return {
    startDate: parseDob(sickLeave.startDate),
    endDate: parseDob(sickLeave.endDate)
  };
}

export const parseDischarge = (discharge: unknown): Discharge => {
  if(!discharge || typeof discharge !== 'object'
    || !('date' in discharge && 'criteria' in discharge)) {
    return {} as Discharge;
  }
  return {
    date: parseDob(discharge.date),
    criteria: parseString(discharge.criteria),
  };
}


export default toNewPatient;