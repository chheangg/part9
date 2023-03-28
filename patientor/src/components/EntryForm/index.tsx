import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

import { 
  Alert,
  FormLabel,
  FormControlLabel,
  Radio,
  Stack,
  Box,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Select,
  MenuItem,
  Button,
  RadioGroup } from "@mui/material"
import { Diagnose, EntryWithoutId, healthCheckRating} from "../../types";

interface Prop {
  handleSubmission: (entry: EntryWithoutId) => Promise<void>
  error: string,
}

const EntryForm = ({ handleSubmission, error }: Prop) => {
  const [formType, setFormType] = useState<string>('HealthCheck');
  const [diagnosis, setDiagnosis] = useState<Diagnose[]>([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnose[]>([]);

  useEffect(() => {
    axios.get<Diagnose[]>(
      apiBaseUrl + '/diagnoses'
    ).then(({ data }) => {
      setDiagnosis(data);
    })
  }, []);

  const getFormTypeInputs = () => {
    switch (formType) {
      case 'HealthCheck':
        return (
          <FormControl>
            <FormLabel id="health-options-label"></FormLabel>
            <RadioGroup
              value={healthCheckRating.Healthy}
              name="healthCheckRating"
            >
              <FormControlLabel value={healthCheckRating.Healthy} control={<Radio />} label="Healthy" />
              <FormControlLabel value={healthCheckRating.LowRisk} control={<Radio />} label="Low Risk" />
              <FormControlLabel value={healthCheckRating.HighRisk} control={<Radio />} label="High Risk" />
              <FormControlLabel value={healthCheckRating.CriticalRisk} control={<Radio />} label="Critical Risk" />
            </RadioGroup>
          </FormControl>
        )
      case 'OccupationalHealthCare':
        return (
          <>
            <FormControl>
              <InputLabel htmlFor='employer'>Employer</InputLabel>
              <Input id='employer' name='employer'></Input>
            </FormControl>
            <FormControl>
              <label>Start  Date</label>
              <Input id='start-date' type='date' name='startDate' placeholder=""></Input>
            </FormControl>
            <FormControl>
              <label>End Date</label>
              <Input id='end-date' type='date' name='endDate' placeholder=""></Input>
            </FormControl>
          </>
        )
      case 'Hospital':
        return (
          <>
            <FormControl>
              <label>Discharge Date</label>
              <Input id='discharge-date' type='date' name='dischargeDate' placeholder=""></Input>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='criteria'>Criteria</InputLabel>
              <Input id='criteria' name='criteria'></Input>
            </FormControl>
          </>
        );
      default:
        throw new Error('Form type doesn\'t exist');
    }
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const target = event.currentTarget
    let formData = {
      description: target.description.value,
      date: target.date.value,
      specialist: target.specialist.value,
      diagnosisCodes: selectedDiagnosis.map(diagnose => diagnose.code),
    }
    event.preventDefault();
    switch (formType) {
      case 'HealthCheck':
        handleSubmission({
          ...formData,
          healthCheckRating: target.healthCheckRating.value,
          type: 'HealthCheck'
        })
        break;
      case 'OccupationalHealthCare':
        handleSubmission({
          ...formData,
          employerName: target.employer.value,
          sickLeave: {
            startDate: target.startDate.value,
            endDate: target.endDate.value,
          },
          type: 'OccupationalHealthcare'
        })
        break;
      case 'Hospital':
        handleSubmission({
          ...formData,
          discharge: {
            date: target.dischargeDate.value,
            criteria: target.criteria.value
          },
          type: 'Hospital',
        })
        break;
      default:
        throw new Error('Invalid input');
    }
  
  }

  return (
    <Box mt='1rem'>
      <InputLabel id='form-type-label'>Form type</InputLabel>
      <Select labelId="form-type-label" value={formType}>
        <MenuItem onClick={() => setFormType('HealthCheck')} value='HealthCheck'>Health Check</MenuItem>
        <MenuItem onClick={() => setFormType('OccupationalHealthCare')} value='OccupationalHealthCare'>Occupational Healthcare</MenuItem>
        <MenuItem onClick={() => setFormType('Hospital')} value='Hospital'>Hospital</MenuItem>
      </Select>
      <Box mt='2rem' border='1px solid black' p='2rem'>
      {
        error ?
        <>
          <Alert severity="error">
            {error}
          </Alert>
          <Box height='2rem'></Box>
        </> :
        null
      }
      <Typography mb='1rem' variant='h4'>Entry Form</Typography>
      <form onSubmit={handleSubmit}>
        <Stack gap='1rem'>
          <FormControl fullWidth>
            <InputLabel htmlFor='description'>Description</InputLabel>
            <Input id='description' name='description' placeholder="Enter a minimum of 3 characters"></Input>
          </FormControl>
          <Box height='0.25rem'/>
          <FormControl fullWidth>
            <label>Date</label>
            <Input id='date' type='date' name='date' placeholder=""></Input>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor='specialist'>Specialist</InputLabel>
            <Input id='specialist' name='specialist'></Input>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='select-label'>Diganoses Code</InputLabel>
            {
              diagnosis[0] ? 
              <Select
              labelId="select-label"
              id='diagnoses-code'
              name='diagnosesCode'
              value={''}
            >
              <MenuItem value=''>Select a diagnosis</MenuItem>
              {diagnosis.map(diagnose => (
                <MenuItem 
                key={diagnose.code} 
                value={diagnose.code} 
                onClick={() => setSelectedDiagnosis([...selectedDiagnosis as Diagnose[], diagnose])}
                >
                  {diagnose.name}
                </MenuItem>
              ))}
            </Select>
            :
            null
          }
          <Typography variant='h5'>Selected Diagnosis</Typography>
          <Stack>
            {
              selectedDiagnosis.length > 0 ?
              selectedDiagnosis.map(diagnose => (
                <Box key={diagnose.code + '-selected'}>
                  {diagnose.name}
                  <Button color='primary' 
                  onClick={() => 
                    setSelectedDiagnosis(selectedDiagnosis.filter(d => d.code !== diagnose.code))
                  }>
                    Remove
                  </Button>
                </Box>
              )) 
              : null
            }
          </Stack>
          </FormControl>
          {getFormTypeInputs()}
          <Button type='submit' variant='contained'>Submit</Button>  
        </Stack>
      </form>
    </Box>

    </Box>
  )
}

export default EntryForm