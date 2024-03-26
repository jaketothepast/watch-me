import { useState } from 'react'
import './App.css'
import SiteInput from './components/SiteInput'
import SiteDisplay from './components/SiteDisplay';
import { useAtom } from 'jotai';
import { stateAtom } from './state';

type SiteType = any[];

function App() {
  const [sites, setSites] = useState<SiteType>([]);

  // Use/set the state of our application.
  const [state, setState] = useAtom(stateAtom);

  function deleteSite(site: String) {
    setSites(sites.filter(s => s !== site));
  }

  function startSession() {
    setState('session');
    // TODO: Add code to synchronize session with backend.
  }

  return (
    <div className="App">
      <header>
        <p>State: {state}</p>
      </header>

      <ul>
      {sites.map((site: string) => {
        return <SiteDisplay key={site} deleteSite={() => deleteSite(site)} site={site} />
      })}
      </ul>

      <SiteInput saveSite={ (site: string) => {
        const update = new Set([...sites, site]);
        setSites(Array.from(update));
      } }/>

      <button onClick={startSession}>Start Session</button>
    </div>
  )
}

export default App
