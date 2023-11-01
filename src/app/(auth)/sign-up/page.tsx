import RegisterForm from '@/components/RegisterForm'
import { db } from '@/lib/db';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

async function getPlatoons() {
    const res = await db.platoons.findMany({
      select:{
        id:true,
        platoon: true
      }
    });
    
    return res
  }


const page = async () => {

    const platoonTags = await getPlatoons();

    return (
        <div className='mx-auto'>
            <div className="flex justify-center">
                {/* <!-- Row --> */}
                <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
                    {/* <!-- Col --> */}
                    <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                        <h1 className="py-4 text-4xl text-center text-gray-800 dark:text-white font-bold">Add new user</h1>
                        <RegisterForm platoonTags={platoonTags} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page