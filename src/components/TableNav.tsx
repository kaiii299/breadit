import React from 'react'
import { Input } from './ui/input'
import { Icons } from './Icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/Dropdown-menu'
import Link from 'next/link'
import { buttonVariants } from './ui/Button'

type Props = {}

const TableNav = (props: Props) => {
    return (
        <div className='flex justify-between top-0 inset-x-0 h-fit z-[10] py-2 '>
            <div className='w-1/3 '>
                <Input type='text' placeholder='Search...' />
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Icons.DropDownDotsVertical className='mt-2' />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className='bg-white align-end'>
                        <DropdownMenuItem>
                            <Link href='/sign-up' className={buttonVariants({variant:'ghost'})}>
                                Create new user
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default TableNav