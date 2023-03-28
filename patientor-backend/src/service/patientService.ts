import { NonSensitivePatient, Patient, NewPatient } from "../types";
import { patientsData } from "../../data/patients";
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

const addPatient = (patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };
  patientsData.push(newPatient);
  return newPatient;
}

const getPatient = (patientId: string): Patient | undefined => {
  const patient = patientsData.find(patient => patient.id === patientId);
  console.log(patient);
  return patient;
}

export default {
  getPatients,
  addPatient,
  getPatient
}