import { ApolloServer } from "apollo-server"
import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/schema.js";

const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers
});

server.listen().then(({ url }) => {
    console.log(`Server listening at ${url}`);
});