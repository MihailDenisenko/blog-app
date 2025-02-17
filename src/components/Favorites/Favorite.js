export async function toFavorite(propi) {
	const { slug, onFavor } = propi;
	const propa = {};
	const token = localStorage.getItem('jwt');
	const url = `https://blog-platform.kata.academy/api/articles/${slug}/favorite`;

	if (!onFavor) {
		await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((resp) => resp.json())
			.then((json) => {
				console.log(json);
				propa.favorite = 'adding';
			});
	} else {
		await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((resp) => resp.json())
			.then((json) => {
				console.log(json);
				propa.favorite = 'delete';
			});
	}
	return propa;
}
