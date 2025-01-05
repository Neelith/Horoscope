export class HoroscopeLogger {
	static info(functionName: string, message: string, ...data: any[]): void {
		console.info(`[${functionName}]`, message, data);
	}

	static log(functionName: string, message: string, ...data: any[]): void {
		console.log(`[${functionName}]`, message, data);
	}

	static debug(functionName: string, message: string, ...data: any[]): void {
		console.debug(`[${functionName}]`, message, data);
	}

	static error(functionName: string, message: string, ...data: any[]): void {
		console.error(`[${functionName}]`, message, data);
	}

	static trace(functionName: string, message: string, traceId: string, ...data: any[]): void {
		console.trace(`[${functionName}]`, message, traceId, data);
	}

	static warn(functionName: string, message: string, ...data: any[]): void {
		console.warn(`[${functionName}]`, message, data);
	}
}
