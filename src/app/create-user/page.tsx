'use client'
import { cRanks } from '@/lib/constants'
import React from 'react'
import { Button } from '@/components/ui/Button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { createUsersPayload } from '@/lib/validators/users'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    name: string,
    email: string,
    rank: string,
    pes: string,
    platoon: string,
}

const page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    let Res

    const onSubmit: SubmitHandler<Inputs> = (res) => {
        console.log(res);
        
        axios.post('api/createUser',res).then((res)=>{

        })
        .catch((err)=>{
            
        })
    }
    
        // console.log(res);
        // Mutation functon is any funciton that handle any data fetching using axios


    return (
        <div className='mx-auto'>
            <div className="flex justify-center">
                {/* <!-- Row --> */}
                <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
                    {/* <!-- Col --> */}
                    <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                        <h1 className="py-4 text-3xl text-center text-gray-800 dark:text-white">Add new user</h1>

                        <form className="pt-6 pb-8 mb-4 lg:px-8 px-0 bg-white dark:bg-gray-800 rounded" onSubmit={() => handleSubmit(onSubmit)}
                        >
                            <div className="mb-4 md:flex flex-col md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
                                        Rank
                                    </label>
                                    {/* Dropdown */}
                                    <select {...register('rank')} className="block w-1/5 text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
                                        {cRanks.map((res:any, i: any)=>{
                                            return (
                                                <option key={i} value={res}>{res}</option>
                                            )
                                        })}
                                    </select>

                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" >
                                        Platoon
                                    </label>

                                    {/* Dropdown */}
                                    <select {...register('rank')} className="block w-1/5 text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
                                        {cRanks.map((res:any, i: any)=>{
                                            return (
                                                <option key={i} value={res}>{res}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" >
                                        PES Status
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm uppercase leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="PES Status"
                                        {...register('pes')}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" >
                                    Email
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    {...register('email')}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" >
                                    Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Name"
                                    {...register('name')}
                                    required
                                />
                            </div>


                            <div className="mb-6 text-center flex justify-start">
                                <Button className='w-1/2' type='submit'>Add user</Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page