'use client'
import React from 'react'
import { Button } from "@/components/ui/Button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import RichTextGenerate from './RichTextGenerate'
import { Copy, Send } from "lucide-react"

type Props = {
    usersProps: any
    platoonProps: any
}

const ParadeDialog = ({ usersProps, platoonProps }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className='text-center w-full'>Parade State</Button>
            </DialogTrigger>
            <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogHeader className='sticky'>
                    <DialogTitle>Parade State</DialogTitle>
                    <DialogDescription>
                        Make changes to the Parade State here.
                    </DialogDescription>
                </DialogHeader>
                <div className='min-w-[300px] bg-white p-30 py-10 px-1 rounded-[4px] overflow-y-scroll max-h-screen '>
                    <RichTextGenerate usersProps={usersProps} platoonProps={platoonProps}/>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <div className='flex justify-end gap-3 mr-2'>
                            {/* <Button type="submit" className="px-3">
                                Copy
                                <Copy className="h-4 w-4 ml-2" />
                            </Button> */}
                            <Button type="submit">
                                Send
                                <Send className='h-4 w-4 ml-2' />
                            </Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ParadeDialog