export type Problem = {
	error: string;
	code: number;
	title: string;
	description: string;
};

export function badRequest(error: string): Problem {
	const _badRequest: Problem = {
		code: 400,
		title: 'bad request',
		description: 'request was not correct',
		error: error,
	};

	return _badRequest;
}
