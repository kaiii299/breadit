import React from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/input'
import { Icons } from './Icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/Dropdown-menu'

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
                        <DropdownMenuItem
                            className='cursor-pointer'>
                            Create new user
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default TableNav