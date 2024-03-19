import { expect, test } from "vitest"
import { render } from "@testing-library/react"
import SiteInput from "./SiteInput";

test('adds numbers', () => {
    expect(1 + 2).toBe(3);
});

test('properly renders', async () => {
    render(<SiteInput />);
});
