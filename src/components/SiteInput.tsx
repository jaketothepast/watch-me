import { useState } from "react"

/**
 * Handle the input/saving of one single site.
 */
export default function SiteInput() {
    // Our site we are trying to store.
    const [site, setSite] = useState("");

    function handleInput(e) {
        setSite(e.target.value);
    }

    return (
        <input type="text" placeholder="Enter blockable website" onInput={handleInput} />
    );
}
