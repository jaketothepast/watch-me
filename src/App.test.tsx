import { expect, test } from "vitest"
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
