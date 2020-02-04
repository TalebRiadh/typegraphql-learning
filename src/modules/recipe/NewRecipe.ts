import { User } from './../../entity/User';
import { Recipe } from './../../entity/Recipe';
import {Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql"
import { NewRecipeInput } from "./newRecipe/NewRecipeInput"
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class NewRecipeResolver{
    
  

    @UseMiddleware(isAuth)
    @Mutation(() => Recipe) 
    async NewRecipe(
        @Arg("data"){title,cookingTime}:NewRecipeInput,
        @Ctx() ctx: MyContext
        ): Promise<Recipe>{

            
            const recipe = await Recipe.create({
                title,
                cookingTime,
                chef: await User.findOne(ctx.req.session!.userId)
            }).save()
            
            return recipe
    }
}