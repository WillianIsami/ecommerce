import { gql } from "apollo-server"

export const typeDefs = gql`
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
