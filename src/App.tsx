import './App.css'
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { sitesAtom, stateAtom } from './state';
import SessionConfigure from './views/SessionConfigure';
import BuildSiteList from './views/BuildSiteList';

function App() {
    // Use/set the state of our application.
    const [state, setState] = useAtom(stateAtom);
    const sites = useAtomValue(sitesAtom);

    function startSession() {
        setState('session-prep');
    }

    function storeSession(endAt: Date): void {
        // Sync our session with storage
        chrome.storage.sync.set({ session: { sites: sites, endAt: endAt.toJSON() } });
        setState('session');
    }

    let toDisplay = <p>Loading</p>;
    switch (state) {
        case 'editing':
            toDisplay = <BuildSiteList />;
            break;
        case 'session-prep':
            toDisplay = <SessionConfigure storeSession={storeSession} />;
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
