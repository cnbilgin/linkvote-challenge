import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ConfirmationDialogBox from "./ConfirmationDialogBox";

describe("ConfirmationDialogBox", () => {
	test("renders", () => {
		render(
			<ConfirmationDialogBox title="Title">Content</ConfirmationDialogBox>
		);

		expect(screen.getByRole("button", { name: "close" })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "cancel" })
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "confirm" })
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", {
				name: "Title",
			}).textContent
		).toBe("Title");

		expect(screen.getByText("Content")).toBeInTheDocument();
	});

	test("triggers onClose", () => {
		const onClose = jest.fn();

		render(<ConfirmationDialogBox onClose={onClose} />);

		fireEvent.click(screen.getByRole("button", { name: "close" }));
		fireEvent.click(screen.getByRole("button", { name: "cancel" }));

		fireEvent.click(screen.getByTestId("backdrop"));

		expect(onClose).toHaveBeenCalledTimes(3);
	});

	test("triggers onConfirm", () => {
		const onConfirm = jest.fn();

		render(<ConfirmationDialogBox onConfirm={onConfirm} />);

		fireEvent.click(screen.getByRole("button", { name: "confirm" }));

		expect(onConfirm).toHaveBeenCalled();
	});
});
