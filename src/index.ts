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

import { horoscopeRoutes } from './routes/horoscope-routes';
import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { Const } from './utils/const';

type Bindings = {
	HOROSCOPE_SERVICE_KEY: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

//authentication & authorization
app.use(async (context, next) => {
	const _serviceKeyHeader: string | undefined = context.req.header(Const.serviceKeyHeaderName);

	//if the request has no X-Service-Key header is an unauthorized request
	if (!_serviceKeyHeader) {
		return context.newResponse(null, 401);
	}

	//if the request has the X-Service-Key header but it's not the same defined in the env the response is 403 forbidden
	if (context.env.HOROSCOPE_SERVICE_KEY !== _serviceKeyHeader) {
		return context.newResponse(null, 403);
	}

	//in all the other cases i go ahead with the processing of the request
	return await next();
});

//openapi
app.doc('/doc', {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Horoscope AI',
	},
});

app.get(
	'/',
	swaggerUI({
		url: '/doc',
	})
);

//routes
app.route('/', horoscopeRoutes);

export default app;
