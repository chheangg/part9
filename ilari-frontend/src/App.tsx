
import { useState, useEffect } from 'react';

import { Entry, NewEntry } from './types';

import Entries from './components/Entries';
import { getAll, createEntry } from './services/entryService';
import Form from './components/Form';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    getAll()
      .then(response => setEntries(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (entry: NewEntry) => {
    createEntry(entry)
      .then(response => setEntries([...entries, response.data]))
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <Form handleFormSubmit={handleSubmit} />
      <Entries entries={entries} />
    </div>
  );
}

export default App;
