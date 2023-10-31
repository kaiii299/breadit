import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { createUserValidators } from "@/lib/validators/users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    
    try {

        // const session = await getAuthSession()

        // if(!session?.user){
        //     return new Response('Unauthorized', {status: 401})
        // }

         const body = await req.json()

        //  console.log(body);
         
         
        const {name, email, pes, platoonId, rank, included , username, status} = createUserValidators.parse(body)

        // Check if user exisits
        if(db.user){
            const exisitingUserByEmail = await db.user.findUnique({
                where:{
                    email : body.email
                }
            });

            if(exisitingUserByEmail){
                return NextResponse.json({user: null, message: "user already exist"}, {status:409})
            }
        }

        // Will not create another user

        const newUser = await db.user.create({
            data:{
                name : name,
                email : email,
                included : included,
                pes : pes,
                rank : rank,
                platoonsId : platoonId,
                username : username,
                status : status,
            }
        })
        
        return NextResponse.json(newUser , {status:200});
        


    } catch (error){
        return NextResponse.json({
            message: `${error}`} , {status:500})
    }
}

// Back end function