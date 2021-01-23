import { mockApi } from "./mock-api";

export const linkService = {
	get: () => mockApi.get(),
	remove: (id) => mockApi.remove(id),
	vote: (id, vote) => mockApi.vote(id, vote),
	add: (link) => mockApi.add(link),
};
