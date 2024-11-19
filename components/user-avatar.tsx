import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const UserAvatar = () => {
  const { user } = useUser()

  return (
    <Avatar className='h-8 w-8'>
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(1)}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
