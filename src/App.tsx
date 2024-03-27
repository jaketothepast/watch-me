import './App.css'
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { endAtAtom, sessionAtom, stateAtom } from './state';
import SessionConfigure from './views/SessionConfigure';
import BuildSiteList from './views/BuildSiteList';

function App() {
    // Use/set the state of our application.
    const [state, setState] = useAtom(stateAtom);
    const session = useAtomValue(sessionAtom);
    const setEndAt = useSetAtom<any>(endAtAtom);

    function startSession() {
        setState('session-prep');
        // TODO: Add code to synchronize session with backend.
    }

    function storeSession(endAt: Date): void {
        // Store our endAt value.
        setEndAt(endAt);

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
