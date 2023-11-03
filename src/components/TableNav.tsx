'use client'
import React from 'react'
import { Icons } from './Icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/Dropdown-menu'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/Button'
import ParadeDialog from './ParadeDialog'
import useInput from './ui/input'
import Search from './search'
import useSearch from './search'
type Props = {}

const TableNav = (props: Props) => {


    return (
        <div className='flex justify-between top-0 inset-x-0 h-fit z-[10] py-4 '>
            <div className='flex gap-3'>
                <Search/>
                <ParadeDialog />
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Icons.DropDownDotsVertical className='mt-2' />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className='bg-white align-end'>
                        <DropdownMenuItem>
                            <Link href='/sign-up' className={buttonVariants({ variant: 'ghost' })}>
                                Create new user
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default TableNav