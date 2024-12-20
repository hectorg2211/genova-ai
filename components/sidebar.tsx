'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import FreeCounter from './free-counter'

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] })

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-swhite-500',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-white-500',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: 'text-white-500',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: 'text-white-500',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: 'text-white-500',
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: '/code',
    color: 'text-white-500',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: 'text-white-500',
  },
]

interface SidebarProps {
  apiLimitCount: number
  isPro: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ apiLimitCount = 0, isPro = false }) => {
  const pathname = usePathname()

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white border-none border-transparent'>
      <div className='px-3 py-2 flex-1'>
        <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
          <div className='relative w-8 h-8 mr-4'>
            <Image fill alt='Logo' src='/logo-white.png' />
          </div>

          <h1 className={cn(montserrat.className, 'text-2xl font-bold')}>Genova AI</h1>
        </Link>

        <div className='space-y-1'>
          {routes.map(route => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400'
              )}
            >
              <div className='flex items-center flex-1'>
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                <span className='text-sm font-medium'>{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FreeCounter isPro={isPro} count={apiLimitCount} />
    </div>
  )
}

export default Sidebar
