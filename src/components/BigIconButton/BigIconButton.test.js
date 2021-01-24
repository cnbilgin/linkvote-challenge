import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import BigIconButton from "./BigIconButton";

test("renders correctly", () => {
	render(<BigIconButton icon={"icon"}>Text</BigIconButton>);

	expect(screen.getByText("icon")).toBeInTheDocument();
	expect(screen.getByText("Text")).toBeInTheDocument();
});
