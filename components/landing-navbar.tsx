'use client'

import React from 'react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const font = Montserrat({ weight: '600', subsets: ['latin'] })

const LandingNavbar = () => {
  const { isSignedIn } = useAuth()

  return (
    <nav className='p-4 bg-transparent flex items-center justify-between'>
      <Link href='/' className='flex items-center'>
        <div className='relative h-8 w-8 mr-4'>
          <Image fill alt='Logo' src='/logo-white.png' />
        </div>

        <h1 className={cn(font.className, 'text-2xl font-bold text-white')}>Genova AI</h1>
      </Link>

      <div className='flex items-center gap-x-2'>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant='outline' className='rounded-full'>
            {isSignedIn ? 'Dashboard' : 'Sign Up'}
          </Button>
        </Link>
      </div>
    </nav>
  )
}

export default LandingNavbar
