/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["app", "pages", "components"].map(
		(dir) => `./${dir}/**/*.{js,ts,jsx,tsx}`,
	),
	theme: {
		extend: {},
	},
	plugins: [],
};
