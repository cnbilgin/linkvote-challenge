import React from "react";
import LinkListItem from "./LinkListItem";

export default function LinkList() {
	const data = [
		{
			id: "asd",
			points: 6,
			title: "Hacker News",
			link: "https://news.ycombinator.com/",
		},
		{
			id: "asd1",
			points: 4,
			title: "Hacker News",
			link: "https://news.ycombinator.com/",
		},
		{
			id: "asd2",
			points: 1,
			title: "Hacker News",
			link: "https://news.ycombinator.com/",
		},
	];
	return (
		<div>
			{data.map((link) => (
				<LinkListItem key={link.id} link={link} />
			))}
		</div>
	);
}
