'use client'

import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/use-toast'
import { Icons } from './Icons'


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
    
    const { toast } = useToast()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const loginWithGoogle = async () => {
        setIsLoading(true)

        try {
            await signIn('google')
        } catch (error) {
            // Toast notification
            toast({
                title: 'Something went wrong',
                description: 'There was an error logging in with Google',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn('flex justify-center', className)} {...props}>
            <Button
                isLoading={isLoading}
                type='button'
                size='sm'
                className='w-1/2 lg:w-full'
                onClick={loginWithGoogle}
                disabled={isLoading}>
                {isLoading ? null : <Icons.google className='w-5 mr-2' />}
                Google
            </Button>
        </div>
    )
}

export default UserAuthForm

function toast(arg0: { title: string; description: string; variant: string }) {
    throw new Error('Function not implemented.')
}
