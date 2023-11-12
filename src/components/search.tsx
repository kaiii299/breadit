'use client'

import React, { useCallback, useEffect } from 'react'
import useInput from './ui/input'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Icons } from './Icons'

type Props = {}


const Search = (props: Props) => {

    const inputClassName: string = 'w-[50vw] lg:w-[20vw] h-10 lg:h-10 px-2 lg:mr-3 mr-1 text-sm leading-tight rounded-md text-gray-700 uppercase dark:text-white border  shadow appearance-none focus:outline-none focus:shadow-outline placeholder-gray-300 placeholder-opacity-0 transition duration-200'
    const spanClassName: string = 'block mb-2 text-xl text-gray-300 dark:text-white upper text-opacity-8 absolute left-1 top-2 lg:top-2 px-1 transition duration-200 input-text'
    const { inputRender, inputValue } = useInput('Search Users...', '', spanClassName, inputClassName)

    const router = useRouter();
    
    //* Use Debounce to debounce the input , the search will only happen if the user stops typing, this is to not spam the api
    const [query] = useDebounce(inputValue, 350)

    useEffect(() => {
        // if input is empty 
        if (!query) {
            router.push(`/`)
        } else {
            // If input is not empty
            router.push(`?search=${inputValue}`)
        }

    }, [query])

    return (
        <div className='flex '>
            {/* Search Bar */}
            {inputRender}
        </div>
    )

}

export default Search

