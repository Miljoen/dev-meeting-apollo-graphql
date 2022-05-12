import * as TypeGraphQL from 'type-graphql'
import { User } from '../../../prisma/generated/type-graphql'
import { pubSub } from '../../pub-sub'
import { Root } from 'type-graphql'

@TypeGraphQL.Resolver(_of => User)
export class UserCreatedResolver {
    @TypeGraphQL.Subscription({
        subscribe: () => pubSub.asyncIterator(['USER_CREATED']),
    })
    userCreated(
        @Root() userPayload: User,
    ): User {
        return userPayload
    }
}
