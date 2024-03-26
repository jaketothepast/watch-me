import { useSetAtom } from "jotai";
import { endAtAtom } from "../state";
import { useMemo, useState } from "react";

interface SessionConfigureProps {}

/**
 * Show the session configure view to the user.
 */
export default function SessionConfigure({}:SessionConfigureProps) {
    const setEndAt = useSetAtom(endAtAtom);
    // Set the session time to be the results of the slider.
    const [sessionTime, setSessionTime] = useState(0);
    const sessionTimeText = useMemo(() => {
        if (sessionTime === 0) {
            return 'Use slider to configure session';
        }

        return `${sessionTime} hour${sessionTime > 1 ? 's' : ''}`;
    }, [sessionTime]);

    function handleInput(e: React.FormEvent<HTMLInputElement>): void {
        setSessionTime(parseInt((e.target as HTMLInputElement).value));
    }

    return (<>
        <h2>How long should the session be?</h2>
        <p>{sessionTimeText}</p>
        <div>
            <input id="session-length" name="session-length" type="range" min="0" max="8" step="1" value={sessionTime} onInput={handleInput} />
            <label htmlFor="session-length">Session Length</label>
        </div>
    </>)
}
