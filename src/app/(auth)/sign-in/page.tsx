import React from 'react'
import SignIn from '@/components/SignIn'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='absolute inset-0'>
            <div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
                <SignIn />
            </div>
        </div>
    )
}

export default page