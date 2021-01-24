import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import LinkListItem from "./LinkListItem";

const linkData = {
	points: 3,
	name: "Test Page",
	link: "http://test.com",
	id: "abcde1234",
};

describe("LinkListItem", () => {
	test("renders", () => {
		render(<LinkListItem link={linkData} />);
		expect(parseInt(screen.getByTestId("point").textContent)).toBe(
			linkData.points
		);
		expect(screen.getByRole("heading").textContent).toBe(linkData.name);

		const link = screen.getByRole("link");

		expect(link.textContent).toBe(`(${linkData.link})`);
		expect(link.getAttribute("href")).toBe(linkData.link);

		screen.getByRole("button", { name: "Up Vote" });
		screen.getByRole("button", { name: "Down Vote" });
	});

	test("votes", () => {
		const onVote = jest.fn();

		render(<LinkListItem link={linkData} onVote={onVote} />);

		fireEvent.click(screen.getByRole("button", { name: "Up Vote" }));
		expect(onVote).toHaveBeenLastCalledWith(linkData.id, true);

		fireEvent.click(screen.getByRole("button", { name: "Down Vote" }));
		expect(onVote).toHaveBeenLastCalledWith(linkData.id, false);
	});

	test("removes", () => {
		const onRemove = jest.fn();

		render(<LinkListItem link={linkData} onRemove={onRemove} />);

		fireEvent.click(screen.getByRole("button", { name: "Remove Link" }));
		expect(onRemove).toHaveBeenLastCalledWith(linkData);
	});
});
