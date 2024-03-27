import { useSetAtom } from "jotai";
import { endAtAtom, stateAtom } from "../state";
import { useMemo, useState } from "react";

interface SessionConfigureProps {}

/**
 * Show the session configure view to the user.
 */
export default function SessionConfigure({}:SessionConfigureProps) {
    const setEndAt = useSetAtom<any>(endAtAtom);
    const setState = useSetAtom<any>(stateAtom);
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
     * Set our endAt time, and set a new state for the session
     **/
    function startSession() {
        // EndAt has to be now + the number of hours added
        setEndAt(new Date(new Date().getTime() + (sessionTime * 60 * 60 * 1000)));
        setState('session-start');
    }

    return (<>
        <h2>How long should the session be?</h2>
        <p>{sessionTimeText}</p>
        <div>
            <input id="session-length" name="session-length" type="range" min="0" max="8" step="1" value={sessionTime} onInput={handleInput} />
            <label htmlFor="session-length">Session Length</label>
            <button onClick={startSession}>Start Session</button>
        </div>
    </>)
}
