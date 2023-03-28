import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

import patientService from '../../services/patients';
import { Entry, Patient, Discharge } from "../../types";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { OccupationalHealthcareEntry, HeathCheckEntry, HospitalEntry } from "./Entries";

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
        throw new Error('Error');
    }
  }

  const Icon = icon();

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry discharge={entry.discharge as Discharge} />
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry employerName={entry.employerName} sickLeave={entry.sickLeave} />
      case "HealthCheck":
        return <HeathCheckEntry healthCheckRating={entry.healthCheckRating} />
      default:
        throw new Error('Unknown type');
    }
  }

  return (
    <Box mt='2rem'>
      <Stack direction='row' alignItems='center'>
        <Typography variant="h4">{patient.name}</Typography> {<Icon />}
      </Stack>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      <Typography mt='2rem' variant='h4'>entries</Typography>
      <Box>
        <ul>
          {patient.entries.map((entry) => (
            <li >
              <Box border='1px solid black'>
              <Typography variant="body1">
                {entry.date} <i>{entry.description}</i>
                <ul>
                  {
                    entry.diagnosisCodes ?
                    entry.diagnosisCodes.map((diagnosis) => (
                      <li>{diagnosis}</li>
                    ))
                    :
                    null
                  }
                </ul>
              </Typography>
              <EntryDetails entry={entry} />
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  )
}

export default PatientDetailPage;