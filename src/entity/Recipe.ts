import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";


@ObjectType()
@Entity()
export class Recipe extends BaseEntity {

    @Field(()=> ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;
/*
    @Field()
    @Column()
    description: string;

    @Field()
    @Column("longtext")
    ingredients: string;
*/
    @Field()
    @Column()
    thumbnail: string;
/*
    @Field()
    @Column("longtext")
    steps: string;

*/
    // save it in minutes
    @Field()
    @Column()
    cookingTime: number;

  

    @Field()
    @ManyToOne(type => User, user => user.recipes)
    chef: User;


    @Column('bool', {default: false})
    published: boolean;

}