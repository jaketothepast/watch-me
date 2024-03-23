import { expect, test } from "vitest"
import { render } from "@testing-library/react"
import SiteInput from "./SiteInput";

test('properly renders', async () => {
    render(<SiteInput />);
});
