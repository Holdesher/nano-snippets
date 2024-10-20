import { consoleLog } from '../src/utils/log';

test('Console log works', () => {
	expect(consoleLog('Nano Snippets', 'log')).toBe('🟩 Nano Snippets');
});
