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
import WhatsAppShare from './WhatsAppShare'
import useRichTextGenerate from './RichTextGenerate'

type Props = {
    usersProps: any
    platoonProps: any
}


const ParadeDialog = ({ usersProps, platoonProps }: Props) => {
    
    const {editorRender,plainText} = useRichTextGenerate(usersProps, platoonProps)
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
                    {editorRender}
                </div>
                <DialogFooter>
                        <div className='flex justify-end gap-3 mr-2'>
                            <WhatsAppShare message={plainText}/>
                        </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ParadeDialog