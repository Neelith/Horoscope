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

export function internalServerError(error: string): Problem {
	const _internalError: Problem = {
		code: 500,
		title: 'internal server error',
		description: 'the server was not able to process the request due to internal errors',
		error: error,
	};

	return _internalError;
}
