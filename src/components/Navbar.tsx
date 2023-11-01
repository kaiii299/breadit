// import Link from 'next/link'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/Button'
import { Icons } from './Icons'
import { getAuthSession } from '@/lib/auth'
import UserAccountNav from './UserAccountNav'
import FlyingCroc from './FlyingCroc'

const Navbar = async () => {
    const session = await getAuthSession()
    return (
        <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2 '>
                {/* <FlyingCroc/> */}
            <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
                {/* logo */}
                <Link href='/' className='flex gap-2 items-center'>
                <Icons.logo  className='lg:h-10 lg:w-10 w-10' />
                    <p className='hidden text-zinc-700 text-sm font-medium md:block'>Parade state</p>
                </Link>

                {/* searchBar */}
                {session?.user? (
                    <UserAccountNav  user={session.user}/>
                    ) : (
                        <div >
                        </div>
                )}
            </div>
        </div>
    )
}

export default Navbar