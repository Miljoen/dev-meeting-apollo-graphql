import { prisma } from '../../../prisma/prisma'
import { pubSub } from '../../pub-sub'
import { CreateUserInput } from '../../../generated/graphql'

export async function createUser(input: CreateUserInput) {
    const user = await prisma.user.create({
        data: {
            name: input.name,
        },
    })

    pubSub.publish('USER_CREATED', {
        userCreated: user,
    })

    return user
}