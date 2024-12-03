const fs = require('fs');

const HEADER_FILE = 'block_headers.txt';
const TOKEN_FILE = 'recent_ergo_tokens.txt';
const OUTPUT_FILE = 'header_token_hash_statistics.txt';

function hexCharToDecimalSum(hexString) {
	return hexString
		.split('')
		.map(char => parseInt(char, 16)) // Convert each hex character to decimal
		.filter(value => !isNaN(value)) // Ignore invalid hex characters
		.reduce((sum, num) => sum + num, 0); // Sum them
}

function calculateModuloStatistic(headerIds, tokenIds, modulo) {
	const frequency = {};

	headerIds.forEach(headerId => {
		const headerSum = hexCharToDecimalSum(headerId);
		const randomTokenId = tokenIds[Math.floor(Math.random() * tokenIds.length)];
		const tokenSum = hexCharToDecimalSum(randomTokenId);
		const totalSum = headerSum + tokenSum;
		const moduloResult = totalSum % modulo;

		if (!frequency[moduloResult]) {
			frequency[moduloResult] = 0;
		}
		frequency[moduloResult]++;
	});

	const total = headerIds.length;
	const statistics = Object.entries(frequency)
		.map(([key, count]) => ({
			number: parseInt(key, 10),
			percentage: ((count / total) * 100).toFixed(2),
		}))
		.sort((a, b) => a.number - b.number);

	return statistics;
}

(async function calculateHeaderTokenStatistics() {
	try {
		if (!fs.existsSync(HEADER_FILE)) {
			throw new Error(`Header file "${HEADER_FILE}" not found.`);
		}
		if (!fs.existsSync(TOKEN_FILE)) {
			throw new Error(`Token file "${TOKEN_FILE}" not found.`);
		}

		const headerIds = fs.readFileSync(HEADER_FILE, 'utf8').trim().split('\n');
		const tokenIds = fs.readFileSync(TOKEN_FILE, 'utf8').trim().split('\n');
		console.log(`Loaded ${headerIds.length} header IDs.`);
		console.log(`Loaded ${tokenIds.length} token IDs.`);

		const modulo = 159;
		const statistics = calculateModuloStatistic(headerIds, tokenIds, modulo);

		fs.writeFileSync(OUTPUT_FILE, statistics.map(stat => `${stat.number}: ${stat.percentage}%`).join('\n'));

		console.log(`Statistics saved to ${OUTPUT_FILE}`);
	} catch (error) {
		console.error('Error:', error.message);
	}
})();
