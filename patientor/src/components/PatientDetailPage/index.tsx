import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

import patientService from '../../services/patients';
import axios, { AxiosError }  from "axios";
import { apiBaseUrl } from "../../constants";
import { Entry, Patient, Discharge, EntryWithoutId, ValidationError } from "../../types";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { OccupationalHealthcareEntry, HeathCheckEntry, HospitalEntry } from "./Entries";

import { Box, Stack, Typography } from "@mui/material"
import EntryForm from "../EntryForm";

const PatientDetailPage = () => {
  const params = useParams();
  
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  const handleSubmission = async (entry: EntryWithoutId) => {
    try {
      const { data } = await axios.post<Entry>(
        apiBaseUrl + '/patients/' + patient.id + '/entries', entry
      );
      setPatient(
        {
          ...patient,
          entries: [
            ...patient.entries,
            data
          ]
        }
      );
    } catch (error: unknown) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        setErrorMessage(String(error.response?.data ?? ''));
      } else {
        throw new Error('Unknown error');
      }
    }
  }

  return (
    <Box mt='2rem'>
      <Stack direction='row' alignItems='center'>
        <Typography variant="h4">{patient.name}</Typography> {<Icon />}
      </Stack>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      <EntryForm handleSubmission={handleSubmission} error={errorMessage}/>
      <Box>
        <Typography mt='2rem' variant='h4'>entries</Typography>
        <ul>
          {patient.entries.map((entry) => (
            <li key={entry.id}>
              <Box border='1px solid black'>
              <Box>
                <Typography variant='body1'>{entry.date} <i>{entry.description}</i></Typography>
                <ul>
                  {
                    entry.diagnosisCodes ?
                    entry.diagnosisCodes.map((diagnosis) => (
                      <li key={diagnosis}>{diagnosis}</li>
                    ))
                    :
                    null
                  }
                </ul>
              </Box>
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