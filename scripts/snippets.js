import * as fs from 'fs/promises';
import * as path from 'path';

const SNIPPETS_DIR = path.resolve('./snippets');
const OUTPUT_DIR = path.resolve('./snippets/output');
const OUTPUT_FILE = 'snippets.json';

async function buildSnippets() {
	try {
		await fs.mkdir(OUTPUT_DIR, { recursive: true });

		const languageDirs = await fs.readdir(SNIPPETS_DIR, { withFileTypes: true });

		const allSnippets = {};

		for (const langDir of languageDirs) {
			if (!langDir.isDirectory()) continue;

			const langName = langDir.name;
			const langPath = path.join(SNIPPETS_DIR, langName);
			const snippetsFiles = await getSnippetFiles(langPath);

			if (snippetsFiles.length === 0) continue;

			for (const filePath of snippetsFiles) {
				const content = await fs.readFile(filePath, 'utf8');
				const json = JSON.parse(content);

				Object.assign(allSnippets, json);
			}
		}

		const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
		await fs.writeFile(outputPath, JSON.stringify(allSnippets, null, 2), 'utf8');
		console.log(`Snippets successfully merged into: ${outputPath}`);
	} catch (error) {
		console.error('Error building snippets:', error);
		process.exit(1);
	}
}

async function getSnippetFiles(dirPath) {
	const entries = await fs.readdir(dirPath, { withFileTypes: true });
	return entries
		.filter(entry => entry.isFile() && entry.name.endsWith('.code-snippets'))
		.map(entry => path.join(dirPath, entry.name));
}

buildSnippets();
