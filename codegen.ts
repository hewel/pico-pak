import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "./gql/schema.graphql",
	documents: ["./pages/**/*.tsx"],
	ignoreNoDocuments: true,
	generates: {
		"./gql/resolvers-types.ts": {
			plugins: ["typescript", "typescript-resolvers"],
		},
		"./gql/": {
			preset: "client",
			plugins: [],
		},
	},
};
export default config;
