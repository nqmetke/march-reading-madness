import { json, type RequestHandler } from '@sveltejs/kit';
import { generateReferralCode, getUserReferrals } from '$lib/server/db/actions/user.js';

export const GET: RequestHandler = async ({ params, locals }) => {
	const signed_user = locals.user;

	if (!signed_user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	return await getUserReferrals(params.id!)
}

export const PUT: RequestHandler = async ({ locals }) => {
	const signed_user = locals.user;

	if (!signed_user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	return json({ code: generateReferralCode(locals.user.id) })
}

