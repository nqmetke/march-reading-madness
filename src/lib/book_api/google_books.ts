export async function searchGoogleBooks(query: string) {
	let res = await fetch("https://www.googleapis.com/books/v1/volumes?maxResults=5&projection=lite&q=" + query)
	let response = await res.json();

	let reduced = response.items.map((o: any) => {
		const { selfLink, volumeInfo } = o
		return { selfLink, volumeInfo }
	});
	return reduced
}
