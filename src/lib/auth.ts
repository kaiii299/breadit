// Hander auth logic

import { NextAuthOptions, User, getServerSession } from "next-auth";
import { db } from "./db";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import {nanoid} from 'nanoid'

export const authOptions: NextAuthOptions = {
    // Handle Prisma auth db
    adapter: PrismaAdapter(db),
    session: {
        strategy:'jwt'
    } ,
    pages:{
        signIn:'/sign-in'
    },
    // Auth0 provider
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    // Retrive current session values
    callbacks: {

        // chenck if the user is sining in for the first time or not
        // async signIn({user}: any ){
        //     const existingUser = await db.user.findUnique({
        //         where: {
        //             email: user.email
        //         }
        //     })

        //     // Brings the user to the register page
        //     if(!existingUser){
        //         return '/sign-up'
        //     }

        //     return true
        // },

        async session({token, session}: any){
            
            if(token){
                
                session.user.id = token.id
                session.user.name = token.name 
                session.user.email = token.email 
                session.user.image = token.image 
                session.user.username = token.username 
            }            
            
            console.log(session);
            
            return session 
        },

        
        async jwt({token, user}) {

            // Check if user in db , where email = email in db
            const dbUser = await db.user.findFirst({
                where:{
                    email: token.email,
                }
                
            })

            // If user is not in the db
            if(!dbUser){
                token.id = user!.id
                return token
            }

            // If user has no username in the db return null
            if(!dbUser.username) {
                await db.user.update({
                    where:{
                        id: dbUser.id, 
                    },
                    data :{
                        username: nanoid(10)
                    }
                })
            }
            
            // Else create user
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                image: dbUser.image,
                username: dbUser.username,
                pes: dbUser.pes,
                rank : dbUser.rank,
                included : dbUser.included,
                platoon: dbUser.platoonsId,
            }

            
        },
        async redirect(){
            return '/'
        }
        }
    }

// // Helper 
export const getAuthSession = () => getServerSession(authOptions)