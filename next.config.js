const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	redirects: async () => [
		{ source: "/", destination: "/login", permanent: true },
	],
};

module.exports = withVanillaExtract(nextConfig);
