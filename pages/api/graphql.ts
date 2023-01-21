import { readFileSync } from "fs";
import { array as A } from "fp-ts";
import { pipe, identity } from "fp-ts/function";
import { createYoga, createSchema } from "graphql-yoga";

import { Resolvers } from "gql/resolvers-types";

const typeDefs = readFileSync("gql/schema.graphql", "utf-8");

const resolvers: Resolvers = {
	Query: {
		posts(_, _args, context) {
			return pipe(
				A.makeBy(5, identity),
				A.map((i) => ({ id: i, title: `Title ${i + 1}` })),
			);
		},
	},
};

export const config = {
	api: {
		// Disable body parsing (required for file uploads)
		bodyParser: false,
	},
};

const schema = createSchema({
	typeDefs,
	resolvers,
});

export default createYoga({
	schema,
	graphqlEndpoint: "/api/graphql",
});
