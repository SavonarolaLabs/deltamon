const fs = require('fs');

const HEADER_FILE = 'block_headers.txt';
const TOKEN_FILE = 'recent_ergo_tokens.txt';
const OUTPUT_FILE = 'header_token_distribution_statistics.txt';

function hexCharToDecimalSum(hexString) {
	return hexString
		.split('')
		.map(char => parseInt(char, 16)) // Convert each hex character to decimal
		.filter(value => !isNaN(value)) // Ignore invalid hex characters
		.reduce((sum, num) => sum + num, 0); // Sum them
}

function createCumulativeWeights(range, weights) {
	// Scale weights across the entire range
	const scaledWeights = Array.from({ length: range }, (_, i) => {
		const weightIndex = Math.floor((i / range) * weights.length);
		return weights[weightIndex];
	});

	// Convert to cumulative weights
	let cumulative = 0;
	return scaledWeights.map(weight => (cumulative += weight));
}

function mapToRange(sum, cumulativeWeights) {
	const totalWeight = cumulativeWeights[cumulativeWeights.length - 1];
	const randomValue = sum % totalWeight;

	// Find the index in the cumulative weights
	return cumulativeWeights.findIndex(weight => randomValue < weight);
}

function calculateModuloStatistic(headerIds, tokenIds, range, weights) {
	const cumulativeWeights = createCumulativeWeights(range, weights);
	const frequency = {};

	headerIds.forEach(headerId => {
		const headerSum = hexCharToDecimalSum(headerId);
		const randomTokenId = tokenIds[Math.floor(Math.random() * tokenIds.length)];
		const tokenSum = hexCharToDecimalSum(randomTokenId);
		const totalSum = headerSum + tokenSum;

		const mappedIndex = mapToRange(totalSum, cumulativeWeights);

		if (!frequency[mappedIndex]) {
			frequency[mappedIndex] = 0;
		}
		frequency[mappedIndex]++;
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

		// Precomputed weights for normal-like distribution
		const weights = [1, 3, 7, 15, 25, 35, 50, 65, 80, 90, 100];
		const range = 159;

		const statistics = calculateModuloStatistic(headerIds, tokenIds, range, weights);

		fs.writeFileSync(OUTPUT_FILE, statistics.map(stat => `${stat.number}: ${stat.percentage}%`).join('\n'));

		console.log(`Statistics saved to ${OUTPUT_FILE}`);
	} catch (error) {
		console.error('Error:', error.message);
	}
})();
