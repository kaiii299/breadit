import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
    try{
        const users = await db.user.findMany();
        
        return NextResponse.json(users, {status:200})

    }catch(error){
        return NextResponse.json({message: `${error}`} , {status:500})
    }
    
}