User type in schema:
```typescript
    type User {
        id: ID!
        name: String!
    }
```

createUser in schema:
```typescript
    type Mutation {
        createUser(input: CreateUserInput): User!
    }

    input CreateUserInput {
        name: String!
    }
```

createUser mutation in resolvers:
```typescript
    Mutation: {
        createUser(_: undefined, { input }: GraphQLInput<UserInput>) {
            return createUser(input)
        },
    },
```

schema.prisma setup:
```prisma
model User {
    id String @id @default(uuid())
    name String
}
```

run `prisma migrate dev`

createUser mutation: 
```typescript
import { prisma } from '../../../prisma/prisma'
import { UserInput } from '../../types'

export async function createUser(input: UserInput) {
    const user = await prisma.user.create({
        data: {
            name: input.name,
        },
    })

    return user
}
```

Add users query to schema:
```typescript
    type Query {
        users: [User!]!
    }
```

Add users query in resolvers:
```typescript
    Query: {
        users() {
            return users()
        },
    },
```

Add users query:
```typescript
import { prisma } from "../../../prisma/prisma";

export async function users() {
    return prisma.user.findMany()
}
```

Add src/pub-sub.ts:
```typescript
import { PubSub } from 'graphql-subscriptions'

export const pubSub = new PubSub()
```

Add subscription to schema:
```typescript
    type Subscription {
        userCreated: User
    }
```

Add subscription in src/resolvers.ts:
```typescript
    Subscription: {
        userCreated: {
            subscribe: () => pubSub.asyncIterator(['USER_CREATED']),
        },
    },
```

Publish event in src/graphql/mutations/create-user.ts:
```typescript
    pubSub.publish('USER_CREATED', {
        userCreated: user,
    })
```