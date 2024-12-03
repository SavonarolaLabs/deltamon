const fs = require('fs');
const fetch = require('node-fetch');

const API_URL = 'https://api.ergoplatform.com/api/v1/tokens';
const OUTPUT_FILE = 'recent_ergo_tokens.txt';
const NUM_PAGES = 1000;
const TOKENS_PER_PAGE = 100;

(async function fetchTokenIds() {
	try {
		fs.writeFileSync(OUTPUT_FILE, '');

		for (let page = 0; page < NUM_PAGES; page++) {
			console.log(`Fetching page ${page + 1} of ${NUM_PAGES}...`);
			const offset = page * TOKENS_PER_PAGE;

			const url = `${API_URL}?limit=${TOKENS_PER_PAGE}&offset=${offset}&sortBy=creationHeight&sortDirection=desc`;
			const response = await fetch(url, { headers: { accept: 'application/json' } });

			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			const data = await response.json();
			const tokenIds = data.items.map(token => token.id).join('\n');

			fs.appendFileSync(OUTPUT_FILE, tokenIds + '\n');
			console.log(`Page ${page + 1} fetched successfully.`);

			await new Promise(resolve => setTimeout(resolve, 1000));
		}

		const uniqueTokenIds = Array.from(new Set(fs.readFileSync(OUTPUT_FILE, 'utf8').split('\n')))
			.filter(Boolean)
			.sort();
		fs.writeFileSync(OUTPUT_FILE, uniqueTokenIds.join('\n'));

		console.log(`Retrieved ${uniqueTokenIds.length} unique token IDs. Tokens saved to ${OUTPUT_FILE}`);
	} catch (error) {
		console.error('Error fetching token IDs:', error.message);
	}
})();
