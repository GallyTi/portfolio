import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	kit: {
		adapter: adapter(),
	},
	preprocess: preprocess({
		// Add your svelte-preprocess options here
		typescript: true,
	}),
};

export default config;