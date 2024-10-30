import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { badRequest } from '../utils/problems';
import { getHoroscope } from '../handlers/horoscope-handler';
import { Const } from '../utils/const';

export const horoscopeRoutes = new Hono().basePath('/horoscope');

const signs: string[] = [
	'aries',
	'taurus',
	'gemini',
	'cancer',
	'leo',
	'virgo',
	'libra',
	'scorpio',
	'sagittarius',
	'capricorn',
	'aquarius',
	'pisces',
];

horoscopeRoutes.get(
	`/:${Const.sign}`,
	validator('param', (value, context) => {
		const _sign: string = value[Const.sign]?.trim().toLowerCase();

		if (!signs.includes(_sign)) {
			return context.json(badRequest(`${Const.sign} is not valid`), 400);
		}

		return { sign: _sign };
	}),
	async (context) => await getHoroscope(context)
);
