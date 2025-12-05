import { json, type RequestHandler } from "@sveltejs/kit";
import { deleteReferralCode } from "$lib/server/db/actions/referral";

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const signed_user = locals.user;
	if (!signed_user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	return json({ status: deleteReferralCode(parseInt(params.referral_id!)) })
}
