import { NonSensitivePatient } from "../types";
import { patientsData } from "../../data/patients";

const getPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

export default {
  getPatients
}