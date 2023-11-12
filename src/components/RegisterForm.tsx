'use client'
import { Button } from '@/components/ui/Button'
import axios from 'axios'
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'
import { statusPayload } from '@/lib/validators/users'
import React from 'react'
import { cPes, cRanks } from '@/lib/constants'
import { toast } from '@/hooks/use-toast'
import useInput from './ui/input'

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

    // Get Name input
    const [formData, setFormData] = React.useState<FormInputs>();

    // Get all Platoon
    const {
        register,
        handleSubmit,
        reset
    } = useForm<FormInputs>()

    // Get Input function

    const { inputRender, inputValue } = useInput('Name*');

    const onSubmit: SubmitHandler<FormInputs> = (data) => {

        setFormData(data)
        // Default values
        data.included = true,
            data.status = {
                status: 'In Camp',
                start_date: '',
                end_date: '',
                comments: ''
            },
            // Caps the first letter of each word
            data.name = inputValue.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            data.username = data.name,
            data.included = true,
            data.email = `${data.name.replace(' ', '')}@gmail.com`

        // Reset the form input
        reset({ name: '' });

        createUser(data)

        return data
    }

    // Mutation functon is any funciton that handle any data fetching using axios
    const { mutate: createUser, isLoading } = useMutation({
        mutationFn: (newUser: FormInputs) => {
            return axios.post('/api/createUser', newUser)
        },
        onError: (error: Error) => {
            console.error(error);

            toast({
                title: `${error.message}`,
                description: `${formData?.rank} ${formData?.name} is already in the Parade State! `,
                variant: 'destructive',
            })

            console.error(error)


        },
        onSuccess: () => {

            toast({
                title: 'User Created Successfully',
                description: `${formData?.rank} ${formData?.name} has been added to the Parade State!`,
                variant: 'default',
            })
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
                    <select {...register('rank')} className="block w-1/2 text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
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

                    <select {...register('platoonId')} className="block w-1/2 text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
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
                    <select {...register('pes')} className="block w-1/2 text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none" >
                        {cPes.map((res: any, i: any) => {
                            return (
                                <option className='' key={i} value={res}>{res}</option>
                            )
                        })}
                    </select>
                </div>
            </div>

            <div className="mb-4">
                {/* Render Input */}
                {inputRender}
            </div>


            <div className="mb-6 text-center flex justify-start md:justify-center lg:justify-center">
                <Button className='w-1/2' isLoading={isLoading} >Add user</Button>
                <Button className='md:w-1/4 lg:w-1/2 ml-5' variant={'subtle'}><a href='/'>Cancel</a></Button>
            </div>

        </form>
    )
}

export default RegisterForm