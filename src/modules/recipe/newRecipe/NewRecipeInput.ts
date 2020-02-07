import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class NewRecipeInput  { 

  @Field() 
  @Length(1,255) 
  title: string
/*
  @Field() 
  @Length(1,255) 
  description: string

  @Field() 
  thumbnail: string

  @Field() 
  ingredients: string


  @Field() 
  steps: string
*/
  
  @Field()
  cookingTime: number

}

