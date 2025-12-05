import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema/auth-schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params, locals }) => {
	const signed_user = locals.user;
	if (!signed_user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const all = await db.select().from(user);
	return json(all);
}
