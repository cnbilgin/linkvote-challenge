import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
	test("renders correctly", () => {
		render(<Pagination totalPage={5} page={2} />);

		expect(
			screen.getByRole("listitem", { name: "previous-page" })
		).toBeInTheDocument();

		expect(
			screen.getByRole("listitem", { name: "next-page" })
		).toBeInTheDocument();

		for (let i = 1; i < 5; i++)
			expect(
				screen.getByRole("listitem", { name: `page-${i}` })
			).toBeInTheDocument();
	});

	test("renders hidden previous", () => {
		render(<Pagination totalPage={5} page={1} />);
		expect(screen.queryByRole("listitem", { name: "previous-page" })).toBe(
			null
		);
	});

	test("renders hidden next", () => {
		render(<Pagination totalPage={5} page={5} />);
		expect(screen.queryByRole("listitem", { name: "next-page" })).toBe(null);
	});

	test("triggers changePage", () => {
		const changePage = jest.fn();
		render(<Pagination totalPage={5} page={3} changePage={changePage} />);

		fireEvent.click(screen.getByRole("listitem", { name: "page-4" }));
		expect(changePage).toHaveBeenLastCalledWith(4);

		fireEvent.click(screen.getByRole("listitem", { name: "next-page" }));
		expect(changePage).toHaveBeenLastCalledWith(4);

		fireEvent.click(screen.getByRole("listitem", { name: "previous-page" }));
		expect(changePage).toHaveBeenLastCalledWith(2);

		fireEvent.click(screen.getByRole("listitem", { name: "page-2" }));
		expect(changePage).toHaveBeenLastCalledWith(2);

		expect(changePage).toBeCalledTimes(4);
	});

	test("does not trigger changePage when same page clicked", () => {
		const changePage = jest.fn();
		render(<Pagination totalPage={5} page={3} changePage={changePage} />);

		fireEvent.click(screen.getByRole("listitem", { name: "page-3" }));
		expect(changePage).toHaveBeenCalledTimes(0);
	});
});
