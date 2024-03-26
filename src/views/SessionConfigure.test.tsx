import { test, expect, describe, it, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import SessionConfigure from "./SessionConfigure"

describe("Configuring Session", () => {
    beforeEach(async () => {
       render(<SessionConfigure />);
    });

    test("Shows correct label", async () => {
        screen.getByText('Use slider to configure session');
    });

    test("Input shows 1 hour", async () => {
        const input = screen.getByLabelText("Session Length");
        fireEvent.input(input, { target: { value: 1 } });
        screen.getByText('1 hour');
    });

    test("Input shows hours with s", async () => {
        const input = screen.getByLabelText("Session Length");
        fireEvent.input(input, { target: { value: 2 } });
        screen.getByText('2 hours');
    })
});
