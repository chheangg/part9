import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

import patientService from '../../services/patients';
import { Patient } from "../../types";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Box, Stack, Typography } from "@mui/material";

const PatientDetailPage = () => {
  const params = useParams();
  
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getPatient = async () => {
      if (params.patientId) {
        const patientDetail = await patientService.getPatient(params.patientId);
        setPatient(patientDetail);
        setError(false);
      } else {
        setError(true);
      }
    }

    void getPatient();
  }, [params.patientId])

  if (error || !patient) {
    return <Box><Typography color='red' variant="h3">Patient not found</Typography></Box>
  }

  const icon = () => {
    switch(patient.gender) {
      case 'male':
        return MaleIcon;
      case 'female':
        return FemaleIcon;
      case 'other':
        return TransgenderIcon;
      default:
        return TransgenderIcon;
    }
  }

  const Icon = icon();

  return (
    <Box>
      <Stack direction='row' alignItems='center'>
        <Typography variant="h3">{patient.name}</Typography> {<Icon />}
      </Stack>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
    </Box>
  )
}

export default PatientDetailPage;