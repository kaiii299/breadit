// Hander auth logic

import { NextAuthOptions, getServerSession } from "next-auth";
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
        async session({token, session}: any){
            
            if(token){
                
                session.user.id = token.id
                session.user.name = token.name 
                session.user.email = token.email 
                session.user.image = token.image 
                session.user.username = token.username 
            }            
            
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
            
            // Else
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                image: dbUser.image,
                username: dbUser.username,
            }

            
        },
        redirect(){
            // Redirect to home page when loggin 
            return '/'
        }
    }
}

// Helper 
export const getAuthSession = () => getServerSession(authOptions)