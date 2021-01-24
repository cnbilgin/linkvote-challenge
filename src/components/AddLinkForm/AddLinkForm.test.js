import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AddLinkForm from "./AddLinkForm";
describe("AddLinkForm", () => {
	test("renders correctly", () => {
		render(<AddLinkForm />);

		expect(screen.getByText("Link Name:")).toBeInTheDocument();
		expect(screen.getByRole("textbox", { name: "name" })).toBeInTheDocument();
		expect(screen.getByPlaceholderText("e.g. Alphabet")).toBeInTheDocument();

		expect(screen.getByText("Link URL:")).toBeInTheDocument();
		expect(screen.getByRole("textbox", { name: "link" })).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("e.g. http://abc.xyz")
		).toBeInTheDocument();

		expect(
			screen.getByRole("button", { name: "submit" })
		).toBeInTheDocument();
	});

	test("triggers onError", () => {
		const onError = jest.fn();
		render(<AddLinkForm onError={onError} />);

		const submitButton = screen.getByRole("button", { name: "submit" });
		fireEvent.click(submitButton);

		expect(onError).toHaveBeenLastCalledWith("Please type a name", {
			link: "",
			name: "",
		});

		const nameTextbox = screen.getByRole("textbox", { name: "name" });
		fireEvent.change(nameTextbox, { target: { value: "Name" } });

		fireEvent.click(submitButton);
		expect(onError).toHaveBeenLastCalledWith("Please type a link", {
			link: "",
			name: "Name",
		});

		const linkTextbox = screen.getByRole("textbox", { name: "link" });
		fireEvent.change(linkTextbox, { target: { value: "Link" } });

		fireEvent.click(submitButton);
		expect(onError).toHaveBeenLastCalledWith("Please type a valid link", {
			link: "Link",
			name: "Name",
		});
	});

	test("triggers onSuccess", () => {
		const onSuccess = jest.fn();
		render(<AddLinkForm onSuccess={onSuccess} />);

		const nameTextbox = screen.getByRole("textbox", { name: "name" });
		fireEvent.change(nameTextbox, { target: { value: "Name" } });

		const linkTextbox = screen.getByRole("textbox", { name: "link" });
		fireEvent.change(linkTextbox, { target: { value: "http://test.com" } });

		fireEvent.click(screen.getByRole("button", { name: "submit" }));

		expect(onSuccess).toHaveBeenLastCalledWith({
			link: "http://test.com",
			name: "Name",
		});
	});
});
