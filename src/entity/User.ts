import { Recipe } from './Recipe';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";


@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(()=> ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column("text", {unique: true})
    email: string;

    @OneToMany(type => Recipe, Recipe => Recipe.chef)
    recipes: Recipe[];

    
    @Field()
     name(@Root() parent:User):string{
        return `${parent.firstName} ${parent.lastName}`
    }

    
    @Column()
    password: string;


    @Column('bool', {default: false})
    confirmed: boolean;

}