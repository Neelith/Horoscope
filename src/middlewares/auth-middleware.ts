import { createMiddleware } from 'hono/factory';
import { Const } from '../utils/const';
import { HoroscopeLogger } from '../utils/logger';

export const authentication = createMiddleware(async (context, next) => {
	const _serviceKeyHeader: string | undefined = context.req.header(Const.serviceKeyHeaderName);

	//if the request has no X-Service-Key header is an unauthorized request
	if (!_serviceKeyHeader) {
		HoroscopeLogger.warn('authentication', 'X-Service-Key header is missing', context);
		return context.newResponse(null, 401);
	}

	//if the request has the X-Service-Key header but it's not the same defined in the env the response is 403 forbidden
	if (context.env.HOROSCOPE_SERVICE_KEY !== _serviceKeyHeader) {
		HoroscopeLogger.warn('authentication', "X-Service-Key header is present but it's not valid", context);
		return context.newResponse(null, 403);
	}

	//in all the other cases i go ahead with the processing of the request
	return await next();
});
