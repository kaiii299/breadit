import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { userValidators } from "@/lib/validators/users";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()

        if(!session?.user){
            return new Response('Unauthorized', {status: 401})
        }

        const body = await req.json()
        const {name, email, pes, platoon, rank} = userValidators.parse(body)

        // Check if user exisits

        const userExist = await db.all_Users.findFirst({
            where : {
                name
            }
        })

        if(userExist) {
            return new Response('User already exists', {status: 409})
        }

        const user = await db.all_Users.create({
            data:{
                name,
                email,
                pes,
                platoon,
                rank    
            }
        })

    } catch (error){

    }
}

// Back end function