import { useSetAtom } from "jotai";
import { useState } from "react"
import { sitesAtom } from "../state";


/**
 * Handle the input/saving of one single site.
 */
export default function SiteInput() {
    // Our site we are trying to store.
    const [site, setSite] = useState("");
    const setSites = useSetAtom(sitesAtom);

    function handleInput(e: React.FormEvent<HTMLInputElement>): void {
        setSite((e.target as HTMLInputElement).value);
    }

    /**
     * Don't submit if we don't have a valid site.
     **/
    function handleSubmit(e: React.FormEvent<HTMLInputElement>): void {
        // TODO: Handle more than the empty case.
        if (site === "") {
            return;
        }

        setSite(""); // Clear our input
        setSites((sites) => Array.from(new Set([...sites, site])));
    }

    return (
        <div className="site-input">
            <label htmlFor="site-input">Enter site to block:</label>
            <input id="site-input"
                name="site-input"
                type="text"
                onInput={handleInput}
                value={site} />

            <input id="submit" type="button" onClick={handleSubmit} value={"Submit"} />
        </div>
    );
}
