import React from "react";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";
import classes from "./Button.module.css";

test("renders correctly", () => {
	render(<Button>Text</Button>);
	const button = screen.getByRole("button");

	expect(button).toBeInTheDocument();
	expect(button.textContent).toBe("Text");
	expect(button.classList.contains(classes.button)).toBe(true);
});

test("handling click event", () => {
	const onClick = jest.fn();

	render(<Button onClick={onClick}>Text</Button>);

	fireEvent.click(screen.getByRole("button"));
	expect(onClick).toHaveBeenCalledTimes(1);

	fireEvent.click(screen.getByRole("button"));
	expect(onClick).toHaveBeenCalledTimes(2);
});
