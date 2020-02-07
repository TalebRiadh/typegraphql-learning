import { Upload } from './../../types/Uploads';
import { User } from './../../entity/User';
import { Recipe } from './../../entity/Recipe';
import {Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql"
import { NewRecipeInput } from "./newRecipe/NewRecipeInput"
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../../types/MyContext';
import {GraphQLUpload} from 'graphql-upload'
import { createWriteStream } from 'fs';

@Resolver()
export class NewRecipeResolver {
    
  

    //@UseMiddleware(isAuth)
    @Mutation(() => Recipe) 
    async NewRecipe(
        @Arg("picture",()=>GraphQLUpload)
        {
            createReadStream,
            filename
        }:Upload,
        @Arg("data")
        {
            title,
            cookingTime
        }:NewRecipeInput,
        @Ctx() ctx: MyContext
        ): Promise<Recipe>{

            new Promise(async(resolve, reject)=>
                createReadStream().pipe(createWriteStream(__dirname +`/../../../images/${filename}`))
                .on("finish", ()=> resolve(true))
                .on("error", ()=> reject(false))
                )
            
            const recipe = await Recipe.create({
                title,
                thumbnail: filename,
                cookingTime,
                chef: await User.findOne(ctx.req.session!.userId)
            }).save()
            
            return recipe
    }


   
}
