import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema/auth-schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	const signed_user = locals.user;
	if (!signed_user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	const result = await db
		.select()
		.from(user)
		.where(eq(user.id, params.id!));

	return json(result[0] ?? null);
}
