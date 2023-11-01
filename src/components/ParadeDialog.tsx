'use client'
import React from 'react'
import { Button } from "@/components/ui/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import RichTextGenerate from './RichTextGenerate'

type Props = {}

const ParadeDialog = (props: Props) => {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline">Generate</Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className='fixed inset-0 grid justify-center overflow-auto DialogOverlay'>
                    <DialogContent className="w-screen min-w-[300px] bg-white p-30 py-10 px-1 rounded-[4px]" onPointerDownOutside={(e) => e.preventDefault()}>
                        <div className='my-3 mx-4'>
                            <RichTextGenerate />
                        </div>
                    </DialogContent>
                </DialogOverlay>
            </DialogPortal>
        </Dialog>
    )
}

export default ParadeDialog