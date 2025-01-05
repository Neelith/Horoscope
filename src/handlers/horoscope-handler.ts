import { HoroscopeGetResponse } from '../schemas/horoscope-schema';
import { Problem } from '../schemas/problem-schema';
import { Const } from '../utils/const';
import { HoroscopeLogger } from '../utils/logger';
import { internalServerError } from '../utils/problems';

export async function getHoroscope(context: any) {
	const _params: any = context.req.valid('param');

	const _sign: string = _params[Const.paramSign];

	const _horoscope: string | undefined = getHoroscopeFromMap(_sign);

	if (!_horoscope) {
		HoroscopeLogger.error('getHoroscope', 'cannot get the horoscope for sign', _sign);
		const _problem: Problem = internalServerError(`cannot get the horoscope for sign ${_sign}`);
		return context.json(_problem, 500);
	}

	const _response: HoroscopeGetResponse = {
		horoscope: _horoscope,
	};

	return context.json(_response);
}

function getHoroscopeFromMap(_sign: string): string | undefined {
	return horoscopes.get(_sign);
}

const horoscopes: Map<string, string> = new Map([
	['aries', 'Today is a great day to take initiative and start new projects. Your energy and enthusiasm will lead you to success.'],
	['taurus', "Focus on your finances today. It's a good time to make a budget and plan for future investments."],
	['gemini', "Communication is key today. Reach out to friends and family, and don't hesitate to express your thoughts and ideas."],
	[
		'cancer',
		"Take some time for self-care and relaxation. It's important to recharge your batteries and take care of your emotional well-being.",
	],
	//['leo', 'Your creativity is at its peak today. Use this energy to work on artistic projects or find new ways to express yourself.'],
	['virgo', 'Pay attention to details and stay organized. This will help you achieve your goals and avoid any potential setbacks.'],
	['libra', 'Balance is important today. Make sure to find time for both work and play, and maintain harmony in your relationships.'],
	[
		'scorpio',
		'Trust your intuition and follow your instincts. They will guide you in the right direction and help you make important decisions.',
	],
	[
		'sagittarius',
		'Adventure awaits! Embrace new experiences and explore new horizons. Your curiosity will lead you to exciting opportunities.',
	],
	[
		'capricorn',
		"Hard work and determination will pay off today. Stay focused on your goals and don't be afraid to take on new challenges.",
	],
	[
		'aquarius',
		'Innovation and originality are your strengths today. Think outside the box and come up with creative solutions to problems.',
	],
	['pisces', 'Embrace your compassionate side and help those in need. Your kindness and empathy will make a positive impact on others.'],
]);
