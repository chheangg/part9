
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Entry, NewEntry, ValidationError } from './types';

import Entries from './components/Entries';
import { getAll, createEntry } from './services/entryService';
import Form from './components/Form';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getAll()
      .then(response => setEntries(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (entry: NewEntry) => {
      createEntry(entry)
      .then(response => setEntries([...entries, response.data]))
      .catch(err => {
        if(axios.isAxiosError<ValidationError, Record<string, unknown>>(err)) {
          if (err.response) {
            setError(String(err.response.data));
          }
        }
      });
  };

  return (
    <div className="App">
      <Form handleFormSubmit={handleSubmit} error={error} />
      <Entries entries={entries} />
    </div>
  );
}

export default App;
