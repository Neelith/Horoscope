/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Context, Hono, Next } from 'hono';
import { horoscopeRoutes } from './routes/horoscope-routes';
import { rateLimit, RateLimitBinding, RateLimitKeyFunc } from '@elithrar/workers-hono-rate-limit';
import { HTTPException } from 'hono/http-exception';
import { badRequest } from './utils/problems';

type Bindings = {
	FREE_USER_LIMITER: RateLimitBinding;
};

const getKey: RateLimitKeyFunc = (context: Context): string => {
	const _authorizationHeader: string | undefined = context.req.header('Authorization');

	//check _authorizationHeader is valid
	if (!_authorizationHeader) {
		throw new HTTPException(400, {
			res: context.json(badRequest('Authorization header is missing'), 400),
		});
	}

	return _authorizationHeader;
};

const rateLimiter = async (c: Context, next: Next) => {
	return await rateLimit(c.env.FREE_USER_LIMITER, getKey)(c, next);
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', rateLimiter);

//routing
app.get('/', (context) => context.text('Welcome!'));

app.route('/', horoscopeRoutes);

export default app;
