import express from 'express';
import patientService from '../service/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
})

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body)
  const addedPatient = patientService.addPatient(newPatient);

  res.json(addedPatient);
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatient(id);

  res.send(patient);
})

export default router;