import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BigIconButton from "./BigIconButton";

describe("BigIconButton", () => {
	test("renders correctly", () => {
		render(<BigIconButton icon={"icon"}>Text</BigIconButton>);

		expect(screen.getByText("icon")).toBeInTheDocument();
		expect(screen.getByText("Text")).toBeInTheDocument();
	});
});
