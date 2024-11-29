'use client'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import TypewriterComponent from 'typewriter-effect'
import { Button } from '@/components/ui/button'

const LandingHero = () => {
  const { isSignedIn } = useAuth()

  return (
    <div className='text-white font-bold py-20 text-center space-y-6'>
      <div className='text-4xl sm:text-5xl space-y-5 font-extrabold'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl   m-0'>Use Genova AI for</h1>
        <div className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-500 to-yellow-500'>
          <TypewriterComponent
            options={{
              strings: ['Chatbots', 'Image Generation', 'Video Generation', 'Music Generation'],
              loop: true,
              autoStart: true,
            }}
          />
        </div>
      </div>

      <div className='text-sm md:text-sm font-normal text-zinc-400'>Create content using AI 10x faster</div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant='premium' className='md:text-lg p-4 md:p-6 rounded-full font-medium'>
            {isSignedIn ? 'Dashboard' : 'Start Generating Gor Free'}
          </Button>
        </Link>
      </div>

      <div
        className='text-zinc-400 text-xs md:text-sm font-normal
      '
      >
        No credit card required.
      </div>
    </div>
  )
}

export default LandingHero
