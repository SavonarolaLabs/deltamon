import { creatureImages } from "$lib/creatureImages";
import { writeFileSync } from "fs";
import { Creature } from "../types";

function generateRandomStat(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCreatureList(): Creature[] {
	const creatures: Creature[] = [];
	let creatureNumber = 1;

	creatureImages.forEach((evolutionChain, index) => {
		evolutionChain.forEach((img, evolutionIndex) => {
			creatures.push({
				id: creatureNumber++,
				name: "",
				img: img,
				maxHp: generateRandomStat(50, 150),
				maxMp: generateRandomStat(50, 150),
				attack: generateRandomStat(10, 50),
				defense: generateRandomStat(5, 25),
				initiative: generateRandomStat(1, 20),
				abilities: [],
			});
		});
	});

	return creatures;
}

const creatures = createCreatureList();
const creatureData = `export const creatures = ${JSON.stringify(
	creatures,
	null,
	2
)};`;
writeFileSync("./creatures.ts", creatureData);
console.log("creatures file generated: creatures.ts");
