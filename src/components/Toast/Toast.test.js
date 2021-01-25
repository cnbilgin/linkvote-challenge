import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import Toast from "./Toast";
import classes from "./Toast.module.css";

describe("Toast", () => {
	test("renders correctly", () => {
		const toastBody = <div>test</div>;
		render(
			<Toast type="success" id="abcde123">
				{toastBody}
			</Toast>
		);

		const toast = screen.getByLabelText("toast");
		within(toast).getByText("test");

		expect(toast.classList.contains(classes.toastSuccess)).toBe(true);
	});

	test("triggers onRemove when timer ends", () => {
		jest.useFakeTimers();
		const onRemove = jest.fn();

		render(<Toast type="success" id="abcde123" onRemove={onRemove}></Toast>);

		jest.advanceTimersByTime(1000);

		expect(onRemove).not.toBeCalled();

		jest.advanceTimersByTime(3000);

		expect(onRemove).toBeCalled();
	});

	test("triggers onRemove without default timer value", () => {
		jest.useFakeTimers();
		const onRemove = jest.fn();

		render(
			<Toast
				type="success"
				id="abcde123"
				onRemove={onRemove}
				timer={5000}
			></Toast>
		);

		jest.advanceTimersByTime(1000);

		expect(onRemove).not.toBeCalled();

		jest.advanceTimersByTime(3000);

		expect(onRemove).not.toBeCalled();

		jest.advanceTimersByTime(5000);

		expect(onRemove).toBeCalled();
	});
});
