import React from 'react'

interface LandingLayoutProps {
  children: React.ReactNode
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <main className='h-auto lg:h-full bg-[#111827]'>
      <div className='mx-auto max-w-screen-xl h-full w-full'>{children}</div>
    </main>
  )
}

export default LandingLayout
