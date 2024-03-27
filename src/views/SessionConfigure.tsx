import { useSetAtom } from "jotai";
import { endAtAtom, stateAtom } from "../state";
import { useMemo, useState } from "react";

interface SessionConfigureProps {
    storeSession: (d: Date) => void
}

/**
 * Show the session configure view to the user.
 */
export default function SessionConfigure({ storeSession }:SessionConfigureProps) {

    // Set the session time to be the results of the slider.
    const [sessionTime, setSessionTime] = useState(0);
    const sessionTimeText = useMemo(() => {
        if (sessionTime === 0) {
            return 'Use slider to configure session';
        }

        return `${sessionTime} hour${sessionTime > 1 ? 's' : ''}`;}, [sessionTime]);

    function handleInput(e: React.FormEvent<HTMLInputElement>): void {
        setSessionTime(parseInt((e.target as HTMLInputElement).value));
    }

    /**
     * Convert sessionTime to a datetime, then call storeSession
     */
    function handleStoreSession(): void {
        // sessionTime is in hours, so need to multiply to get ms.
        storeSession(new Date(new Date().getTime() - (sessionTime * 60 * 60 * 1000)))
    }

    return (<>
        <h2>How long should the session be?</h2>
        <p>{sessionTimeText}</p>
        <div>
            <input id="session-length" name="session-length" type="range" min="0" max="8" step="1" value={sessionTime} onInput={handleInput} />
            <label htmlFor="session-length">Session Length</label>

            <button id="store-session" onClick={() => handleStoreSession()}>Start Session</button>
        </div>
    </>)
}
