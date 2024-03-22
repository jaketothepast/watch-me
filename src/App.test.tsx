import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders App", async () => {
   render(<App />);
})

test("has site input", async () => {
    // Arrange
    render(<App />);


    // Assert
    const item = screen.getAllByLabelText("Enter site to block:");
    expect(item).toHaveLength(1);
})
