import * as vscode from 'vscode';
import { consoleLog } from './utils/log';

export const activate = (context: vscode.ExtensionContext) => {
	const disposable = vscode.commands.registerCommand('nano-snippets', function () {
		consoleLog('Nano Snippets', 'log');

		context.subscriptions.push(disposable);
	});
};

export const deactivate = () => {};
