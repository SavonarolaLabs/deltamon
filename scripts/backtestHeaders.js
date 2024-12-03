const fs = require('fs');

const INPUT_FILE = 'block_headers.txt';
const OUTPUT_FILE = 'hash_statistics.txt';

function hexCharToDecimalSum(hexString) {
	return hexString
		.split('')
		.map(char => parseInt(char, 16)) // Convert each hex character to decimal
		.filter(value => !isNaN(value)) // Ignore invalid hex characters
		.reduce((sum, num) => sum + num, 0); // Sum them
}

function calculateModuloStatistic(headerIds, modulo) {
	const frequency = {};

	headerIds.forEach(id => {
		const decimalSum = hexCharToDecimalSum(id);
		const moduloResult = decimalSum % modulo;

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

(async function calculateHeaderStatistics() {
	try {
		if (!fs.existsSync(INPUT_FILE)) {
			throw new Error(`Input file "${INPUT_FILE}" not found.`);
		}

		const headerIds = fs.readFileSync(INPUT_FILE, 'utf8').trim().split('\n');
		console.log(`Loaded ${headerIds.length} header IDs.`);

		const modulo = 159;
		const statistics = calculateModuloStatistic(headerIds, modulo);

		fs.writeFileSync(OUTPUT_FILE, statistics.map(stat => `${stat.number}: ${stat.percentage}%`).join('\n'));

		console.log(`Statistics saved to ${OUTPUT_FILE}`);
	} catch (error) {
		console.error('Error:', error.message);
	}
})();
