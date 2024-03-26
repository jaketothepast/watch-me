import './App.css'
import SiteInput from './components/SiteInput'
import SiteDisplay from './components/SiteDisplay';
import { useAtom, useAtomValue } from 'jotai';
import { sitesAtom, stateAtom } from './state';

function App() {
  const sites = useAtomValue(sitesAtom);

  // Use/set the state of our application.
  const [state, setState] = useAtom(stateAtom);

  
  function startSession() {
    setState('session-prep');
    // TODO: Add code to synchronize session with backend.
  }

  
  return (
    <div className="App">
      <header>
        <p>State: {state}</p>
      </header>

      <ul>
      {sites.map((site: string) => {
        return <SiteDisplay key={site} site={site} />
      })}
      </ul>

      <SiteInput />

      <button onClick={startSession}>Start Session</button>
    </div>
  )
}

export default App
