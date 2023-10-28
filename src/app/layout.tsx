// import Navbar from '@/components/Navbar'
import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'
import { Toaster } from '@/components/ui/Toaster'
// import Providers from '@/components/Providers'
// import { Toaster } from '@/components/ui/Toaster'

export const metadata = {
  title: 'Parade state',
  description: 'ParadeState app for Bravo',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn(
        'bg-white text-slate-900 antialiased light',
        inter.className
      )}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
        <div className='container max-w-7xl mx-auto h-full pt-12'>
          {children}
        </div>
        <Navbar />
        {/* <div className='container max-w-7xl mx-auto h-full pt-12'>
          {children}
        </div> */}
        {/* <Providers>
          @ts-expect-error Server Component
          {authModal}

        </Providers> */}
        <Toaster /> 

      </body>
    </html>
  )
}
