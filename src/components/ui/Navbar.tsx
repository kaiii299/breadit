// import Link from 'next/link'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from 'public/icon-full.png'
import { buttonVariants } from './Button'

type Props = {}


const Navbar = (props: Props) => {
    return (
        <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2 '>
            <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
                {/* logo */}
                <Link href='/' className='flex gap-2 items-center'>
                    <Image src={logo} alt='logo' className='lg:h-10 lg:w-10 h-8 w-8'/>
                    <p className='hidden text-zinc-700 text-sm font-medium md:block'>Parade state</p>
                </Link>

                {/* searchBar */}
                <Link href='/sign-in' className={buttonVariants()} >Sign in</Link>
            </div>
        </div>
    )
}

export default Navbar