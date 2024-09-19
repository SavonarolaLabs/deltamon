import { creatureImages } from "$lib/creatureImages";
import { writeFileSync } from "fs";
import { Creature } from "../types";
import { PHYSICAL, FIRE, ICE, PURE } from "./constants"; // Make sure you import these from your constants file

function generateRandomStat(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCreatureList(): Creature[] {
	const creatures: Creature[] = [];
	let creatureNumber = 1;

	creatureImages.forEach((evolutionChain) => {
		evolutionChain.forEach((img) => {
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
				dmgAmplifier: {
					[PHYSICAL]: 1,
					[PURE]: 1,
					[FIRE]: generateRandomStat(0.5, 1.5),
					[ICE]: generateRandomStat(0.5, 1.5),
				},
				dmgResistance: {
					[PHYSICAL]: generateRandomStat(0.5, 1.5),
					[PURE]: 1,
					[FIRE]: generateRandomStat(0.5, 1.5),
					[ICE]: generateRandomStat(0.5, 1.5),
				},
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
