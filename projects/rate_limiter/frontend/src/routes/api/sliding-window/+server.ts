import type { RequestHandler } from './$types';
import rateLimitReached from './algorithm';

export const GET: RequestHandler = async ({ getClientAddress }) => {
	const ip = getClientAddress();

	if (!ip) {
		return new Response('No IP address provided', { status: 400 });
	}

	const isRateLimited = await rateLimitReached(ip);

	if (isRateLimited) {
		return new Response('Rate limit reached', { status: 429 });
	}

	return new Response(`Hello, sliding window! ${ip}`);
};
