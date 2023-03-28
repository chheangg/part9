import { Discharge, healthCheckRating, SickLeave } from "../../types"

interface HospitalEntryProp {
  discharge: Discharge
}

interface HealthCheckEntryProp {
  healthCheckRating: healthCheckRating
}

interface OccupationalHealthcareEntryProp {
  employerName: string,
  sickLeave?: SickLeave
}

export const HospitalEntry = ({discharge} : HospitalEntryProp) => (
  <div>
    <h5>Discharge Information</h5>
    { discharge ? 
      <>
        <div>Discharge date: {discharge.date}</div>
        <div>Criteria: {discharge.criteria}</div>
      </>
       :
      null
    }
  </div>
)

export const HeathCheckEntry = ({healthCheckRating}: HealthCheckEntryProp) => (
  <div>
    <h5>Healthcheck Information</h5>
    <div>ratings: {healthCheckRating}</div>
  </div>
)

export const OccupationalHealthcareEntry = ({employerName, sickLeave} : OccupationalHealthcareEntryProp) => (
  <div>
    <h5>Occupational Healthcare Information</h5>
    <div>Employer name: {employerName}</div>
    {
      sickLeave ?
      <>
        <ul>
          <li>Start: {sickLeave.startDate}</li>
          <li>End: {sickLeave.endDate}</li>
        </ul>
      </>
      :
      null
    }
  </div>
)