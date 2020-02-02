import {Resolver,Query, Ctx } from "type-graphql"
import { User } from "../../entity/User"
import { MyContext } from "../../types/MyContext"


@Resolver()
export class CurrentUserResolver{

    @Query(() => User, {nullable:true})
    async CurrentUser(@Ctx() ctx: MyContext):Promise<User |undefined>{
        if(!ctx.req.session!.userId){
            return undefined
        }
        return User.findOne(ctx.req.session!.userId)    
    }

}