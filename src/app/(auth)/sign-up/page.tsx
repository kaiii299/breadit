'use client'
import RegisterForm from '@/components/RegisterForm'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'


const page = () => {

    const { data: platoonsTags, isLoading: isLoadingTags } = useQuery({
        queryKey: ['platoons'],
        queryFn: async () => {
            const response = await axios.get('/api/getPlatoons');

            return response.data;
        },
    });

    return (
        <div className='mx-auto'>
            <div className="flex justify-center">
                {/* <!-- Row --> */}
                <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
                    {/* <!-- Col --> */}
                    <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                        <h1 className="py-4 text-4xl text-center text-gray-800 dark:text-white font-bold">Add new user</h1>
                        <RegisterForm platoonTags={platoonsTags} isLoadingTags={isLoadingTags} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page