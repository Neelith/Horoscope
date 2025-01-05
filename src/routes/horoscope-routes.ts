import { signs } from '../dtos/signs';
import { getHoroscope } from '../handlers/horoscope-handler';
import { authentication } from '../middlewares/auth-middleware';
import { HoroscopeGetResponseSchema } from '../schemas/horoscope-schema';
import { ProblemSchema } from '../schemas/problem-schema';
import { Const } from '../utils/const';
import { createRoute, z } from '@hono/zod-openapi';
import { OpenAPIHono } from '@hono/zod-openapi';

//base path
const horoscopeBasePath = '/horoscope';

export const horoscopeRoutes = new OpenAPIHono();

//authentication & authorization
horoscopeRoutes.use(authentication);

//horoscope/sign route
horoscopeRoutes.openapi(
	createRoute({
		method: 'get',
		path: `${horoscopeBasePath}/{${Const.paramSign}}`,
		request: {
			params: z.object({
				sign: z.enum(signs).openapi({
					example: 'leo',
				}),
			}),
		},
		responses: {
			200: {
				content: {
					'application/json': {
						schema: HoroscopeGetResponseSchema,
					},
				},
				description: 'Horoscope of the day for the requested sign.',
			},
			400: {
				content: {
					'application/json': {
						schema: ProblemSchema,
					},
				},
				description: 'Bad request',
			},
			401: {
				content: {
					'application/json': {
						schema: ProblemSchema,
					},
				},
				description: 'Unauthorized',
			},
			500: {
				content: {
					'application/json': {
						schema: ProblemSchema,
					},
				},
				description: 'Internal server error',
			},
		},
	}),
	async (context) => await getHoroscope(context)
);
