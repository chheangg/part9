import { Entry } from "../types"  ;

interface EntriesProp {
  entries: Entry[],
}

const EntryElement = (props: Entry) => (
  <div>
    <h3>{props.date}</h3>
    <p>visibility: {props.visibility}</p>
    <p>weather: {props.weather}</p>
  </div>
);

const Entries = (props: EntriesProp) => (
  <div>
    <h2>Diary entries</h2>
    {
      props.entries.map(entry => (
        <EntryElement key={entry.id} {...entry} />
      ))
    }
  </div>
);

export default Entries; 