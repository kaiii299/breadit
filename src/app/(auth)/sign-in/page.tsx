import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { ChevronLeft } from 'lucide-react'
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