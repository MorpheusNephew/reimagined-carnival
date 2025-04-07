import { redisClient } from '$lib/server';
import type { SetOptions } from 'redis';

const REQUEST_PER_TEN_SECONDS = 3;

const getRedisKey = (ip: string): string => `sliding_window:${ip}`;

const rateLimitReached = async (ip: string): Promise<boolean> => {
	const redisKey = getRedisKey(ip);

	const result = await redisClient.get(redisKey);
	let occurrences = 0;
	let setOptions: SetOptions = {
		EX: 10
	};

	if (result) {
		occurrences = parseInt(result);
		setOptions = { KEEPTTL: true };
	}

	if (occurrences >= REQUEST_PER_TEN_SECONDS) {
		return true;
	}

	occurrences += 1;

	await redisClient.set(redisKey, occurrences.toString(), setOptions);

	return false;
};

export default rateLimitReached;
