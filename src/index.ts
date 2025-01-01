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

type Bindings = {};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

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
