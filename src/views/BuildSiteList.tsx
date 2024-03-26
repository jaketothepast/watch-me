import { useAtom, useAtomValue } from "jotai";
import { sitesAtom, stateAtom } from "../state";
import SiteDisplay from "../components/SiteDisplay";
import SiteInput from "../components/SiteInput";

export default function BuildSiteList() {
    const sites = useAtomValue(sitesAtom);
    const [state, setState] = useAtom(stateAtom);

    function startSession() {
        setState('session-prep');
    }

    return (
        <>
            <ul>
                {sites.map((site: string) => {
                    return <SiteDisplay key={site} site={site} />
                })}
            </ul>

            <SiteInput />
            <button onClick={startSession}>Start Session</button>
        </>
    )
}
