'use client'
import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from '@/components/sidebar'

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetTitle className='sr-only'>Sidebar</SheetTitle>

      <SheetContent side='left' className='p-0 m-0 border-r-0'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
