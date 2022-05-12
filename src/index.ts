import 'reflect-metadata'
import { createServer } from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import path from 'path'
import { buildSchema } from 'type-graphql'
import { FindManyUserResolver, UserCrudResolver } from '../prisma/generated/type-graphql'
import { PrismaClient } from '@prisma/client'
import { Context } from 'vm'
import { UserCreatedResolver } from './type-graphql/resolvers/user-created'
import { CreateUserResolver } from './type-graphql/resolvers/create-user'

dotenv.config()
main()

async function main() {
    const app = express()
    const httpServer = createServer(app)

    const schema = await buildSchema({
        resolvers: [
            FindManyUserResolver,
            UserCreatedResolver,
            CreateUserResolver,
        ],
        emitSchemaFile: path.resolve(__dirname, './generated-schema.graphql'),
        validate: false,
    })

    const prisma = new PrismaClient()
    await prisma.$connect()

    const server = new ApolloServer({
        schema,
        context: (): Context => ({ prisma }),
    })

    await server.start()

    server.applyMiddleware({ app })

    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath },
    )

    httpServer.listen(process.env.HTTP_PORT, () => {
        console.log(`🚀 HTTP server ready at :${process.env.HTTP_PORT}${server.graphqlPath}`)
        console.log(`🚀 Websocket server ready at :${process.env.HTTP_PORT}${server.graphqlPath}`)
    })
}
