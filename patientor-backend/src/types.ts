export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

interface SickLeave {
  startDate: string,
  endDate: string,
}

interface Discharge {
  date: string,
  criteria: string
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum healthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: healthCheckRating,
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: SickLeave,
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge?: Discharge
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

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;