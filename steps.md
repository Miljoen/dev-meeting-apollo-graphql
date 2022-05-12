Show it all still works
- Query
- Mutation
- Subscription

Open schema and resolvers.

Show a lot of types are typed by hand.

In essence, a lot of it is duplicate information.

Show codegen.yml

Show package.json for script

Run:
```bash
npm run graphql:generate
```

Show type User and type Resolvers

Change Resolvers type in resolvers.ts ":Resolvers"

Show errors, createUser type

Change createUser input in schema ts, run codegen again

Fix error, Subscription

```typescript
    Subscription: {
        userCreated: {
            subscribe: () => ({
                [Symbol.asyncIterator]: () => pubSub.asyncIterator(['USER_CREATED'])
            }),
        },
    },
```