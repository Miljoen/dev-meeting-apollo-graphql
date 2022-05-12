import * as TypeGraphQL from "type-graphql";
import {
    CreateUserArgs,
    CreateUserResolver as OriginalCreateUserResolver,
    User,
} from '../../../prisma/generated/type-graphql'
import { GraphQLResolveInfo } from 'graphql'
import { pubSub } from '../../pub-sub'

@TypeGraphQL.Resolver(_of => User)
export class CreateUserResolver extends OriginalCreateUserResolver {
    @TypeGraphQL.Mutation(_returns => User, {
        nullable: false
    })
    async createUser(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateUserArgs): Promise<User> {
        return super.createUser(ctx, info, args)
            .then(async (user) => {
                await pubSub.publish('USER_CREATED', user)

                return user
            })
    }
}
