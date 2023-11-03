import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface contextProps  {
    params: {
        userId : string
    }
}

// Upade status 

export async function PATCH(req: Request, context: contextProps) {
    
    try {
        const {params} = context;        

        const body = await req.json()
        
        await db.user.update({
            where:{
                id: params.userId
            },

            data :{
                status : body
            }
        });

        return NextResponse.json({message: 'Successfully updated'} , {status: 200})

    } catch (error){
        return NextResponse.json({
            message: `${error}`} , {status:500})
    }
}


