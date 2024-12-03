const fs = require('fs');
const fetch = require('node-fetch');

const API_URL = 'http://213.239.193.208:9053/blocks/lastHeaders/';
const OUTPUT_FILE = 'block_headers.txt';
const BATCH_SIZE = 1000;
const TARGET_HEADERS = 100000;

(async function fetchHeaders() {
	try {
		// Ensure the file exists and is empty
		fs.writeFileSync(OUTPUT_FILE, '');

		let totalFetched = 0;
		let lastHeight = undefined;

		while (totalFetched < TARGET_HEADERS) {
			const url = `${API_URL}${BATCH_SIZE}${lastHeight ? `?from=${lastHeight}` : ''}`;
			const response = await fetch(url, { headers: { accept: 'application/json' } });

			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			const headers = await response.json();
			if (!headers || headers.length === 0) break; // Stop if no more headers are returned

			// Extract IDs and append them to the file
			const ids = headers.map(header => header.id).join('\n');
			fs.appendFileSync(OUTPUT_FILE, ids + '\n');

			// Update the last height and total fetched count
			totalFetched += headers.length;
			lastHeight = headers[headers.length - 1].height;

			console.log(`Fetched ${totalFetched}/${TARGET_HEADERS} headers...`);
		}

		console.log('Done! Headers saved to', OUTPUT_FILE);
	} catch (error) {
		console.error('Error fetching headers:', error.message);
	}
})();
