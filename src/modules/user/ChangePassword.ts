import { Mutation, Arg, Resolver, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import bcrypt from 'bcryptjs'
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { ChangePasswordInput } from "./changePassword/ChangePasswordinput";
import { MyContext } from "../../types/MyContext";



@Resolver()
export class ChangePasswordResolver{

    @Mutation(()=> User, {nullable:true})
    async changePassword(@Arg("data"){
        token,
        password
    }: ChangePasswordInput,
    @Ctx() ctx: MyContext
    ): Promise<User | null>{
        const userId = await redis.get(forgotPasswordPrefix + token)

        if(!userId){
            return null
        }

        const user = await User.findOne(userId)

        if(!user){
            return null
        }

        // delete the token from redis to not use it again
        await redis.del(forgotPasswordPrefix + token)

        user.password = await bcrypt.hash(password, 12)

        await user.save()

        //login the user after changing the password
        ctx.req.session!.userId = user.id

        return user
    }
}

