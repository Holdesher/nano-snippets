type LogVariant = 'log';

export const consoleLog = (str: string, type: LogVariant = 'log') => {
	const variant: Record<LogVariant, string> = {
		log: '🟩', // Base log.
	};
	const data = `${variant[type]} ${str}`;

	console.log(data);
	return data;
};
