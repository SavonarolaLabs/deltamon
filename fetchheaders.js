async function getLastHeaderIds() {
	try {
		// Fetch current blockchain height
		const infoResponse = await fetch('http://213.239.193.208:9053/info');
		const infoData = await infoResponse.json();
		const currentHeight = infoData.height;

		// Array to store header IDs
		const headerIds = [];

		// Fetch last 1000 header IDs
		for (let i = 0; i < 1000; i++) {
			const height = currentHeight - i;
			const headerResponse = await fetch(`http://213.239.193.208:9053/blocks/${height}/header`);
			const headerData = await headerResponse.json();
			headerIds.push(headerData.id);
		}

		// Write header IDs to a file
		const outputPath = './ergo_header_ids.txt';
		await require('fs').promises.writeFile(outputPath, headerIds.join('\n'), 'utf-8');

		console.log(`Successfully wrote ${headerIds.length} header IDs to ${outputPath}`);
		return headerIds;
	} catch (error) {
		console.error('Error retrieving header IDs:', error);
	}
}

// Run the function
getLastHeaderIds();
