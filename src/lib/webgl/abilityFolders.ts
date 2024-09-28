import type { AbilityFolder } from '$lib/types';

export const abilityFolders: AbilityFolder[] = [
	{ name: 'flame10', path: '/abilities/flame10', frameCount: 41 },
	{ name: 'flame2', path: '/abilities/flame2', frameCount: 16 },
	//{ name: 'flame5', path: '/abilities/flame5', frameCount: 84 },
	//{ name: 'slash3', path: '/abilities/slash3', frameCount: 12 },
	{ name: 'water10', path: '/abilities/water10', frameCount: 14 },
	//{ name: 'water2', path: '/abilities/water2', frameCount: 17 },
	//{ name: 'water6', path: '/abilities/water6', frameCount: 12 },
	{ name: 'water8', path: '/abilities/water8', frameCount: 21 },

	// New lightning ability with mixed grid formats
	{ name: 'lightnings1_0000', path: '/abilities/lightnings1/0000.png', frameCount: 9, isGridFormat: true, gridRows: 3, gridCols: 3 },
	{ name: 'lightnings1_0001', path: '/abilities/lightnings1/0001.png', frameCount: 9, isGridFormat: true, gridRows: 3, gridCols: 3 },
	{ name: 'lightnings1_0002', path: '/abilities/lightnings1/0002.png', frameCount: 16, isGridFormat: true, gridRows: 4, gridCols: 4 },
	{ name: 'lightnings1_0003', path: '/abilities/lightnings1/0003.png', frameCount: 9, isGridFormat: true, gridRows: 3, gridCols: 3 },
];
