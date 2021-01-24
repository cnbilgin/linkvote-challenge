import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Select from "./Select";
const data = [
	{
		text: "Option 1",
		value: "val-1",
	},
	{
		text: "Option 2",
		value: "val-2",
	},
];
describe("Select", () => {
	test("renders correctly", () => {
		render(<Select options={data} placeholder="Select a value" />);

		expect(screen.getByTestId("selector").textContent).toBe("Select a value");

		const options = screen.getByTestId("options");
		data.forEach((item, i) => {
			expect(options.children[i].textContent).toBe(item.text);
		});
	});

	test("renders value", () => {
		render(
			<Select
				options={data}
				placeholder="Select a value"
				value={data[1].value}
			/>
		);

		expect(screen.getByTestId("selector").textContent).toBe(data[1].text);
	});

	test("triggers onChange", () => {
		const onChange = jest.fn();
		render(<Select options={data} onChange={onChange} />);

		const options = screen.getByTestId("options");
		data.forEach((item, i) => {
			fireEvent.click(options.children[i]);
			expect(onChange).toHaveBeenLastCalledWith(item);
		});
	});

	test("does not triggers onChange when same value selected", () => {
		const onChange = jest.fn();
		render(
			<Select options={data} onChange={onChange} value={data[0].value} />
		);

		fireEvent.click(screen.getByTestId("options").children[0]);
		expect(onChange).not.toBeCalled();
	});
});
