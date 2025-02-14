



export async function toFavorite(slug, favorited) {
  
  const token = localStorage.getItem('jwt')
  const url = `https://blog-platform.kata.academy/api/articles/${slug}/favorite`;
if (!favorited){
  fetch(url, {
		method: 'POST',
		headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
		},
	}).then(resp=>resp.json()).then(json=>console.log(json))
}else {
  fetch(url, {
    method:"DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((resp) => resp.json())
		.then((json) => console.log(json));
}
}