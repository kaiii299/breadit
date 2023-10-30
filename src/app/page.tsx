import DisplayTables from "@/components/Display-tables";
import { db } from '@/lib/db'
import { createUsersPayload } from "@/lib/validators/users";

async function getUsers() {
  const res = await db.user.findMany({
    select:{
      id:true,
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


export default async function Home() {

  const users = await getUsers();

  return (
    <>
      <DisplayTables users={users}/>
    </>
  );
}
