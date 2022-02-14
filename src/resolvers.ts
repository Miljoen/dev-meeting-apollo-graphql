import { GraphQLInput, User, UserInput } from './types'
import { pubSub } from './pub-sub'

export const resolvers = {
    Query: {
        users(): User[] {
            return [
                { id: 1, name: 'John' },
                { id: 2, name: 'Doe' },
                { id: 3, name: 'Jane' },
            ]
        }
    },
    Mutation: {
        createUser(_: undefined, { input }: GraphQLInput<UserInput>): User {
            const user = {
                id: 4,
                name: input.name
            }

            pubSub.publish('USER_CREATED', {
                userCreated: user
            })

            return user
        }
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubSub.asyncIterator(['USER_CREATED']),
        },
    }
}