import './App.css'
import SiteInput from './components/SiteInput'
import SiteDisplay from './components/SiteDisplay';
import { useAtom, useAtomValue } from 'jotai';
import { sitesAtom, stateAtom } from './state';
import SessionConfigure from './views/SessionConfigure';
import BuildSiteList from './views/BuildSiteList';
import ActiveSession from './views/ActiveSession';

function App() {
  const sites = useAtomValue(sitesAtom);

  // Use/set the state of our application.
  const [state, setState] = useAtom(stateAtom);

  
  function startSession() {
    setState('session-prep');
    // TODO: Add code to synchronize session with backend.
  }

  let toDisplay = <p>Loading</p>;
  switch (state) {
      case 'editing':
          toDisplay = <BuildSiteList />;
          break;
      case 'session-prep':
          toDisplay = <SessionConfigure />;
          break;
      case 'session-start':
          toDisplay = <ActiveSession />;
          break;
      default:
          toDisplay = <p>Loading...</p>;
  }
  return (
    <div className="App">
      <header>
        <p>State: {state}</p>
      </header>

      {toDisplay}
    </div>
  )
}

export default App
