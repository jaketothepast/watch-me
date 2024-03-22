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
        <div className="site-input">
            <label htmlFor="site-input">Enter site to block:</label>
            <input id="site-input" name="site-input" type="text" onInput={handleInput} />
        </div>
    );
}
