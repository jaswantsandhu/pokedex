import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./index";

describe("Card component", () => {
  test("renders children correctly", () => {
    const childText = "This is a test child";
    render(
      <Card>
        <div>{childText}</div>
      </Card>
    );

    const childElement = screen.getByText(childText);
    expect(childElement).toBeInTheDocument();
  });
});
