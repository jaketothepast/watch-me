import { useState } from "react"

type SaveFunction = (s: string) => void;
interface SiteInputProps {
    saveSite: SaveFunction,
}

/**
 * Handle the input/saving of one single site.
 */
export default function SiteInput(props: SiteInputProps) {
    // Our site we are trying to store.
    const [site, setSite] = useState("");

    function handleInput(e: InputEvent) {
        setSite((e.target as HTMLInputElement).value);
    }

    /**
     * Don't submit if we don't have a valid site.
     **/
    function handleSubmit(e: Event) {
        // TODO: Handle more than the empty case.
        if (site === "") {
            return;
        }

        props.saveSite(site);
    }

    return (
        <div className="site-input">
            <label htmlFor="site-input">Enter site to block:</label>
            <input id="site-input" name="site-input" type="text" onInput={handleInput} />

            <input id="submit" type="button" onClick={handleSubmit} />
        </div>
    );
}
