
import { useState, useEffect } from 'react';

import { Entry } from './types';

import Entries from './components/Entries';
import { getAll } from './services/entryService';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    getAll()
      .then(response => setEntries(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <Entries entries={entries} />
    </div>
  );
}

export default App;
