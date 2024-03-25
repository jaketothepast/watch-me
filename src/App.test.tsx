import { expect, test, beforeEach, describe, it } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import App from "./App"

test("renders App", async () => {
    render(<App />);
});

test("has site input", async () => {
    // Arrange
    render(<App />);


    // Assert
    const item = screen.getAllByLabelText("Enter site to block:");
    expect(item).toHaveLength(1);
});

describe("Adding sites", () => {
    beforeEach(async () => {
        // Arrange
        render(<App />);

        // Act
        const input = screen.getByLabelText("Enter site to block:");
        fireEvent.input(input, { target: { value: "Another site" } });
        fireEvent.click(screen.getByText("Submit"),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            }));
    });

    test("saved the site", async () => {
        const items = screen.getAllByText("Another site");
        expect(items).toHaveLength(1);
    });

    test("can delete the site", async () => {
        const del = screen.getByRole("deletion");
        fireEvent.click(del);
        expect(screen.queryAllByText("Another site").length).toEqual(0);
    });
});

test("it saves sites", async () => {
    // Arrange
    render(<App />);

    // Act
    const input = screen.getByLabelText("Enter site to block:");
    fireEvent.input(input, { target: { value: "Another site" } });
    fireEvent.click(screen.getByText("Submit"),
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));

    // Assert
    const items = screen.getAllByText("Another site");
    expect(items).toHaveLength(1);
});

test("it deletes sites", async () => {
    // Arrange
    render(<App />);

    // Act
    const input = screen.getByLabelText("Enter site to block:");
    fireEvent.input(input, { target: { value: "Another site" } });
    fireEvent.click(screen.getByText("Submit"),
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));

    // Assert
    const items = screen.getAllByText("Another site");
    expect(items).toHaveLength(1);
});
