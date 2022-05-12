import * as TypeGraphQL from 'type-graphql'
import graphqlFields from 'graphql-fields'
import { GraphQLResolveInfo } from 'graphql'
import { User } from '../../../prisma/generated/type-graphql'
import {
    getPrismaFromContext,
    transformCountFieldIntoSelectRelationsCount,
    transformFields,
} from '../../../prisma/generated/type-graphql/helpers'
import { pubSub } from '../../pub-sub'
import { Args, Root } from 'type-graphql'

@TypeGraphQL.Resolver(_of => User)
export class UserCreatedResolver {
    @TypeGraphQL.Subscription({
        // topics: "USER_CREATED", // single topic
        subscribe: () => pubSub.asyncIterator(['USER_CREATED']),
    })
    userCreated(
        @Root() notificationPayload: User,
    ): User {
        return notificationPayload
    }
}
