import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import fs from "fs-extra";
import path from "path";

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: "replace-images-with-39_1",
			closeBundle: async () => {
				const monsterDir = path.resolve(__dirname, "build/monster");
				const targetImage = path.join(monsterDir, "39_1.jpg");

				// Ensure the target image exists
				if (!fs.existsSync(targetImage)) {
					console.error(
						"Error: 39_1.jpg not found in build/monster/"
					);
					return;
				}

				// Replace all images in the folder except 39_1.jpg
				const files = await fs.readdir(monsterDir);
				for (const file of files) {
					const filePath = path.join(monsterDir, file);
					if (file !== "39_1.jpg" && path.extname(file) === ".jpg") {
						await fs.copy(targetImage, filePath);
					}
				}
				console.log("All images replaced with 39_1.jpg");
			},
		},
	],
});
