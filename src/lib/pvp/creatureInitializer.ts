import { creatureImages } from "$lib/creatureImages";
import { writeFileSync } from "fs";
import { Creature } from "../types";

function generateRandomStat(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMonsterList(): Creature[] {
	const monsters: Creature[] = [];
	let monsterNumber = 1;

	creatureImages.forEach((evolutionChain, index) => {
		evolutionChain.forEach((img, evolutionIndex) => {
			monsters.push({
				id: monsterNumber++,
				name: "",
				img: img,
				maxHp: generateRandomStat(50, 150),
				attack: generateRandomStat(10, 50),
				defense: generateRandomStat(5, 25),
				initiative: generateRandomStat(1, 20),
				skills: [],
			});
		});
	});

	return monsters;
}

const monsters = createMonsterList();
const monsterData = `export const monsters = ${JSON.stringify(
	monsters,
	null,
	2
)};`;
writeFileSync("./monsters.ts", monsterData);
console.log("Monsters file generated: monsters.ts");
