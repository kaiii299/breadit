'use client'
import { Button } from '@/components/ui/Button'
import axios from 'axios'
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { statusPayload } from '@/lib/validators/users'
import React from 'react'
import { cPes, cRanks } from '@/lib/constants'
import Loading from './Loading'
import { useToast } from '@/hooks/use-toast'

type Props = {
    platoonTags: any
}

// name, email, pes, platoon, rank, included , regular, username, company, status
type FormInputs = {
    // Get from inputs
    name: string,
    email: string,
    pes: string,
    platoonId: string,
    rank: string,

    status: statusPayload,

    included: boolean,

    company: string,

    username?: string,
}

const RegisterForm = ({ platoonTags }: Props) => {

    // Get all Platoon
    const {
        register,
        handleSubmit,
    } = useForm<FormInputs>()

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        // Default values
        data.included = true,
            data.status = {
                status: 'In Camp',
                start_date: '',
                end_date: '',
                comments: ''
            },

            data.username = data.name,

            data.included = true,

            createUser(data)

            // console.log(data);
            

    }
    
    const { toast } = useToast()

    const router = useRouter();
    
    // Mutation functon is any funciton that handle any data fetching using axios
    const { mutate: createUser, isLoading } = useMutation({
        mutationFn: (newUser: FormInputs) => {
            return axios.post('/api/createUser', newUser)
        },
        onError: (error: Error) => {
            console.error(error);

            toast({
                title: 'Error',
                description: `${error.message}`,
                variant: 'default',
            })

        },
        onSuccess: () => {

            toast({
                title: 'Success',
                description: 'User created',
                variant: 'default',
            })

            router.push('/')
        }
    })

    return (
        <form className="pt-6 pb-8 mb-4 lg:px-8 px-0 bg-white dark:bg-gray-800 rounded" onSubmit={(e) => handleSubmit(onSubmit)(e)}
        >
            <div className="mb-4 md:flex flex-col md:justify-between">

                <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
                        Rank*
                    </label>
                    {/* Dropdown */}
                    <select {...register('rank')} className="block w-1/5 text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
                        {cRanks.map((res: any, i: any) => {
                            return (
                                <option className='' key={i} value={res}>{res}</option>
                            )
                        })}
                    </select>

                </div>

                <div className="mb-4">
                    <label className="block my-2 text-sm font-bold text-gray-700 dark:text-white" >
                        Platoon*
                    </label>

                        <select {...register('platoonId')} className="block w-1/5 text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
                            {platoonTags?.map((res: any, i: any) => {
                                return (
                                    <option key={i} value={res.id}>{res.platoon}</option>
                                )
                            })}
                        </select>
                </div>

                <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" >
                        PES Status*
                    </label>
                    {/* Dropdown */}
                    <select {...register('pes')} className="block w-1/5 text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
                        {cPes.map((res: any, i: any) => {
                            return (
                                <option className='' key={i} value={res}>{res}</option>
                            )
                        })}
                    </select>
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
                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white upper" >
                    Name*
                </label>
                <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 uppercase dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Name"
                    {...register('name')}
                    required
                />
            </div>


            <div className="mb-6 text-center flex justify-center">
                <Button className='w-1/4' isLoading={isLoading} >Add user</Button>
                <Button className='md:w-1/4 lg:w-1/2 ml-3' variant={'subtle'}><a href='/'>Cancel</a></Button>
            </div>

        </form>
    )
}

export default RegisterForm