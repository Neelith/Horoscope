import { rateLimit, RateLimitKeyFunc } from '@elithrar/workers-hono-rate-limit';
import { Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { badRequest, internalServerError } from './problems';

enum UserType {
	FREE = 1,
	PREMIUM = 2,
}

type UserConfiguration = {
	key: string;
	type: UserType;
};

const premiumUsers: string[] = ['c9c833cf-e0d1-4a43-b365-6cd1bed34a67', '1f82ef25-1107-4a7d-b2c2-fad3b73c1d51'];

const getKey: RateLimitKeyFunc = (context: any): string => {
	const _authorizationHeader: string = context.req.valid('header')['authorization'];

	return _authorizationHeader;
};

function getUserConfiguration(authorizationHeader: string): UserConfiguration | null | undefined {
	const _isPremiumUser: boolean = premiumUsers.find((key: string) => key == authorizationHeader) !== undefined;

	if (_isPremiumUser) {
		return {
			key: authorizationHeader,
			type: UserType.PREMIUM,
		};
	}

	return null;
}

export const rateLimiter = async (context: any, next: Next) => {
	const _authorizationHeader: string = context.req.valid('header')['authorization'];

	const _userConfiguration: UserConfiguration | null | undefined = getUserConfiguration(_authorizationHeader);

	if (_userConfiguration === undefined) {
		throw new HTTPException(500, {
			res: context.json(internalServerError('Not able to process Authorization header'), 500),
		});
	}

	if (_userConfiguration === null) {
		throw new HTTPException(400, {
			res: context.json(badRequest('Authorization header not valid'), 400),
		});
	}

	return await rateLimit(context.env.PREMIUM_USER_LIMITER, getKey)(context, next);
};
