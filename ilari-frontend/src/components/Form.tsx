import { useState } from "react";
import { NewEntry } from "../types";

interface formProp {
  handleFormSubmit: (entry: NewEntry) => void,
  error: string,
}

const Form = (props: formProp) => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.handleFormSubmit({
      date,
      visibility,
      weather,
      comment
    });

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <form onSubmit={handleForm}>
      <h2>Add new entry</h2>

      <br />
      {props.error && <p>{props.error}</p>}
      <label htmlFor='date'>Date</label>
      <input id='date' defaultValue={date} onChange={(event) => setDate(event.target.value)} />
      <br />
      <label htmlFor='visibility'>Visibility</label>
      <input id='visibility' defaultValue={visibility} onChange={(event) => setVisibility(event.target.value)}  />
      <br />
      <label htmlFor='weather'>Weather</label>
      <input id='weather' defaultValue={weather} onChange={(event) => setWeather(event.target.value)}  />
      <br />
      <label htmlFor='comment'>Comment</label>
      <input id='comment' defaultValue={comment} onChange={(event) => setComment(event.target.value)}  />
      <br />

      <button>Submit</button>
    </form>
  );
};

export default Form;