import express from 'express';
import patientService from '../service/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
})

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = toNewPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  })

  const addedPatient = patientService.addPatient(newPatient);

  res.json(addedPatient);
})

export default router;