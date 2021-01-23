import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "LINKS_DB";
const _initialData = [
	{
		name: "Hacker News",
		link: "https://news.ycombinator.com",
		id: "fbab92be-e131-4c97-b3e9-20d6b6b04362",
		points: 6,
		lastUpdate: "2021-01-23 12:01:00",
	},
	{
		name: "Product Hunt",
		link: "https://producthunt.com",
		id: "5f1183d0-7205-4634-880c-e009d2a453ff",
		points: 4,
		lastUpdate: "2021-01-23 12:10:00",
	},
	{
		name: "REDDIT",
		link: "https://www.reddit.com/",
		id: "1a4115e3-09b8-4f2e-a1da-c9642bee2eed",
		points: 4,
		lastUpdate: "2021-01-23 15:10:00",
	},
	{
		name: "Hepsiburada",
		link: "https://hepsiburada.com",
		id: "a50347b2-a730-4311-b457-c578cfcd296d",
		points: 3,
		lastUpdate: "2021-01-23 12:10:00",
	},
	{
		name: "Google",
		link: "https://google.com",
		id: "fdc3e9ef-5093-4390-bbd1-987dd54b2403",
		points: 1,
		lastUpdate: "2021-01-23 12:10:00",
	},
];

export const mockApi = {
	get,
	remove,
	add,
	vote,
};

function get() {
	return new Promise((resolve) => resolve(_getStorage()));
}

function remove(id) {
	return new Promise((resolve) => {
		const data = _getStorage();

		const newData = data
			.map((link) => (link.id !== id ? link : null))
			.filter((p) => p != null);

		_saveStorage(newData);
		resolve();
	});
}

function add(link) {
	return new Promise((resolve) => {
		const data = _getStorage();
		const newLink = { ...link, points: 0, id: uuidv4() };

		data.push(newLink);

		_saveStorage(data);
		resolve(newLink);
	});
}

function vote(id, vote) {
	return new Promise((resolve) => {
		const data = _getStorage();

		const link = data.find((p) => p.id === id);
		link.points += vote ? 1 : -1;
		link.lastUpdate = _formatDate(new Date());

		_saveStorage(data);
		resolve(link);
	});
}

function _getStorage() {
	let data = localStorage.getItem(STORAGE_KEY);
	if (data == null) {
		data = JSON.stringify(_initialData);
		_saveStorage(_initialData);
	}

	return JSON.parse(data);
}

function _saveStorage(data) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function _formatDate(date) {
	return (
		date.getUTCFullYear() +
		"/" +
		("0" + (date.getUTCMonth() + 1)).slice(-2) +
		"/" +
		("0" + date.getUTCDate()).slice(-2) +
		" " +
		("0" + date.getUTCHours()).slice(-2) +
		":" +
		("0" + date.getUTCMinutes()).slice(-2) +
		":" +
		("0" + date.getUTCSeconds()).slice(-2)
	);
}
