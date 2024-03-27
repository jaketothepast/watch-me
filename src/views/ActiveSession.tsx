import { useAtomValue } from "jotai";
import { endAtAtom } from "../state";
import { useEffect, useState } from "react";

interface ActiveSessionProps {

}

export default function ActiveSession({}: ActiveSessionProps) {
    // Grab our ending at date.
    const endAt = useAtomValue<any>(endAtAtom);
    const [timeString, setTimeString] = useState("");

    function updateTimeString() {
        const now = new Date().getTime()
        const diff = endAt - now;


        // Get the hours
        const hours = Math.round(diff / 60 / 60 / 1000);

        // We can say if the updated seconds count is 0, then we are at 0
        let secondsRemaining = Math.max(0, diff - (hours * 60 * 60 * 1000));
        const minutes = Math.round(secondsRemaining / 60 / 1000);
        secondsRemaining = Math.max(0, secondsRemaining - (minutes * 60 * 1000));

        const seconds = secondsRemaining / 1000;

        // Update time string
        setTimeString(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        setTimeout(updateTimeString, 1000);
    }

    setTimeout(updateTimeString, 1000);

    return (
        <>
            <h1>Session Remaning:</h1>
            <p>{timeString}</p>
        </>
    );
}
