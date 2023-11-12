
import DisplayTables from "@/components/DisplayTables";
import useSearch from "@/components/search";
import { db } from '@/lib/db'
import page from "./(auth)/sign-in/page";


// Get query params
const Home = async ({ searchParams } : { [key: string]: string | undefined}) => {

  // If its type of string it will be used if not undefined
  const search: any = typeof searchParams?.search === 'string' ? searchParams.search : undefined

  // Get all users 
  async function getUsers() {
    if (!searchParams) {
      const res = await db.user.findMany({
        orderBy:{
          pes:'asc'
        },
        select: {
          id: true,
          status: true,
          included: true,
          pes: true,
          rank: true,
          platoon: true,
          name: true,
        }
      });

      return res
    }
    // Get all search users
    else {
      const res = await db.user.findMany({
        orderBy:{
          name:'asc'
        },
        where:{
          name:{
            contains: search
          }
        },
        select: {
          id: true,
          status: true,
          included: true,
          pes: true,
          rank: true,
          platoon: true,
          name: true,
        }
      });

      return res
    }

  }

  const users = await getUsers();
  
  
  async function getPlatoons() {
    const res = await db.platoons.findMany({
      select:{
        platoon: true
      }
    });
    
    return res
  }
  
  const platoons = await getPlatoons()
  

  return (
    <>
      <DisplayTables users={users} platoon={platoons} />
    </>
  );
}

export default Home