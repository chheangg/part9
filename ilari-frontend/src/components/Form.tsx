import { useState } from "react";
import { NewEntry } from "../types";

interface formProp {
  handleFormSubmit: (entry: NewEntry) => void,
  error: string,
}

const Form = (props: formProp) => {
  const [date, setDate] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      visibility: { value: string },
      weather: { value: string },
    };

    props.handleFormSubmit({
      date,
      visibility: target.visibility.value,
      weather: target.weather.value,
      comment
    });

    setDate('');
    setComment('');

    console.log(date, comment);
  };

  return (
    <form onSubmit={handleForm}>
      <h2>Add new entry</h2>

      <br />
      {props.error && <p>{props.error}</p>}
      <label htmlFor='date'>Date</label>
      <input id='date' type='date' onChange={(event) => setDate(event.target.value)} value={date} />
      <br />
      <fieldset>
        <p>Visibility</p>
        <label htmlFor="great">great</label>
        <input id='great' value='great' type='radio' name='visibility'></input>
        <label htmlFor="good">good</label>
        <input id='good' value='good' type='radio' name='visibility'></input>
        <label htmlFor="ok">ok</label>
        <input id='ok' value='ok' type='radio' name='visibility'></input>
        <label htmlFor="poor">poor</label>
        <input id='poor' value='poor' type='radio' name='visibility'></input>
      </fieldset>
      <br />
      <fieldset>
        <p>Weather</p>
        <label htmlFor="sunny">sunny</label>
        <input id='sunny' value='sunny' type='radio' name='weather'></input>
        <label htmlFor="rainy">rainy</label>
        <input id='rainy' value='rainy' type='radio' name='weather'></input>
        <label htmlFor="cloudy">cloudy</label>
        <input id='cloudy' value='cloudy' type='radio' name='weather'></input>
        <label htmlFor="stormy">stormy</label>
        <input id='stormy' value='stormy' type='radio' name='weather'></input>
        <label htmlFor="windy">windy</label>
        <input id='windy' value='windy' type='radio' name='weather'></input>
      </fieldset>
      <br />
      <label htmlFor='comment'>Comment</label>
      <input id='comment' value={comment} onChange={(event) => setComment(event.target.value)}  />
      <br />

      <button>Submit</button>
    </form>
  );
};

export default Form;