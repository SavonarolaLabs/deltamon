import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === "production" ? "/deltamon" : "",
		},
		prerender: {
			entries: [
				"*", // Prerender all normal routes
				"/dungeons/BTC_USD", // Prerender specific dynamic routes
				"/dungeons/ALPH_USD",
				"/dungeons/ETH_USD",
			],
		},
	},
};

export default config;
