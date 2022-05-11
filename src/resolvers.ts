import { pubSub } from './pub-sub'
import { users } from './graphql/queries/users'
import { createUser } from './graphql/mutations/create-user'
import { Resolvers } from '../generated/graphql'

export const resolvers: Resolvers = {
    Query: {
        users() {
            return users()
        },
    },
    Mutation: {
        createUser(_, { input }) {
            return createUser(input)
        },
    },
    Subscription: {
        userCreated: {
            subscribe: () => ({
                [Symbol.asyncIterator]: () => pubSub.asyncIterator(['USER_CREATED']),
            }),
        },
    },
}