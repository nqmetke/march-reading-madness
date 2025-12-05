import { searchGoogleBooks } from "$lib/book_api/google_books";
import { json, type RequestHandler } from "@sveltejs/kit";
export const GET: RequestHandler = async ({ params, url }) => {
	let q = url.searchParams.get("q");
	let search_result = "";
	if (q != null) {
		search_result = await searchGoogleBooks(q);
	}
	return json(search_result);
}

