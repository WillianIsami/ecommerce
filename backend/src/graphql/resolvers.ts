import { randomUUID } from "node:crypto";

interface User {
    id: string 
    email: string
    password: string
}

interface Args {
    id: string 
    email: string
    password: string
}

const users: User[] = [];

export const resolvers = {
    Query: {
        users: () => { 
            return users;
        },
    },
    Mutation: {
        registerUser: (_: unknown, args: Args) => {
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