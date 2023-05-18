const base_url = 'https://acnhapi.com/v1a';

export function getSongs() {
	return fetch(`${base_url}/songs`).then((res) => res.json());
}
