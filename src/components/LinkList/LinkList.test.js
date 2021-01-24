import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LinkList from "./LinkList";

export const linkData = [
	{
		points: 3,
		name: "Test Page",
		link: "http://test.com",
		id: "abcde1234",
	},
	{
		points: 5,
		name: "Test2 Page",
		link: "http://test2.com",
		id: "abcde1235",
	},
	{
		points: 1,
		name: "Test3 Page",
		link: "http://test3.com",
		id: "abcde1236",
	},
];

describe("LinkList", () => {
	test("renders", () => {
		render(<LinkList links={linkData} />);

		expect(screen.getByTestId("cont").children.length).toBe(linkData.length);
	});

	test("renders with different amount of data", () => {
		render(<LinkList links={linkData.slice(0, 2)} />);

		expect(screen.getByTestId("cont").children.length).toBe(2);
	});

	test("renders with zero data", () => {
		render(<LinkList links={[]} />);

		expect(screen.getByText("There is no link in list")).toBeInTheDocument();
	});

	test("renders with no data", () => {
		render(<LinkList />);

		expect(screen.getByText("There is no link in list")).toBeInTheDocument();
	});
});
