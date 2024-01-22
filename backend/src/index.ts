import { ApolloServer, gql } from "apollo-server"
import { randomUUID } from "node:crypto";

const typeDefs = gql`
    type User {
        id: String!
        email: String!        
        password: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        registerUser(email: String!, password: String!): User!
    }
`

interface User {
    id: string 
    email: string
    password: string
}

const users: User[] = [];

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            users: () => { 
                return users;
            },
        },
        Mutation: {
            registerUser: (_, args) => {
                const user = {
                    id: randomUUID(),
                    email: args.email,
                    password: args.password,
                };
    
                users.push(user);
                return user
            }
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`Server listening at ${url}`);
});