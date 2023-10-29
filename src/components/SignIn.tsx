import { Icons } from '@/components/Icons'
import UserAuthForm from '@/components/UserAuthForm'
import Link from 'next/link'

const SignIn = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div>
      </div>
      <div className='flex flex-col space-y-2 text-center'>
      <Icons.logo  className='mx-auto lg:w-1/2 md:w-1/3 w-1/2'/>
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
        <p className='text-sm max-w-xs mx-auto'>
            Login to continue
        </p>
      </div>
      <UserAuthForm />
    </div>
  )
}

export default SignIn