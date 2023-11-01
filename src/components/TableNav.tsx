import React from 'react'
import { Input } from './ui/input'
import { Icons } from './Icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/Dropdown-menu'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/Button'
import ParadeDialog from './ParadeDialog'

type Props = {}

const TableNav = (props: Props) => {
    return (
        <div className='flex justify-between top-0 inset-x-0 h-fit z-[10] py-2 '>
            <div className='flex'>
                <Input type="text" placeholder="Search..." className="input mr-4 input-ghost input-bordered w-1/2 max-w-xs" />
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
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default TableNav