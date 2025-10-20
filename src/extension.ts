import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('nano-snippets', () => {
		vscode.window.showInformationMessage('nano-snippets');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
