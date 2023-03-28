export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Entry {
}


export type Diagnose = {
  code: string,
  name: string,
  latin?: string,
}

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[],
}

export type NewPatient = {
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;