import "reflect-metadata"
import {ApolloServer} from "apollo-server-express"
import Express from "express"
import { buildSchema  } from "type-graphql"
import { createConnection } from "typeorm"
import {RegisterResolver} from "./modules/user/Register"
import session from 'express-session'
import connectRedis from 'connect-redis'
import { redis } from "./redis"
import cors from 'cors'
import { LoginResolver } from "./modules/user/Login"
import { CurrentUserResolver } from "./modules/user/CurrentUser"

const main= async ()=>{
    await createConnection()

    const schema = await buildSchema({
        resolvers: [CurrentUserResolver,RegisterResolver, LoginResolver],
        authChecker: ({context: {req}}
          ) => {
           return !!req.session.userId
          }
    })
    
    // Create a GraphQL server
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }:any)=> ({ req })
    
    })

    const app = Express()
    
    const RedisStore = connectRedis(session)
    app.use(cors({
        credentials:true,
        origin: "http://localhost:3000"
    }))
    app.use(
        session({
            store: new RedisStore({
                client: redis as any,
            }),
            name: "qid",
            secret: "SESSION_SECRET",
            resave:false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 365,
            },
        })
    )

    // Apply the GraphQL server middleware
    apolloServer.applyMiddleware({app})


    app.listen(4000, ()=>{
        console.log("🚀 server started on http://localhost:4000/graphql")
    })
}

main()