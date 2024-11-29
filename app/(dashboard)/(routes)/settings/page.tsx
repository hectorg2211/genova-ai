import Heading from '@/components/heading'
import SubscriptionButton from '@/components/subscription-button'
import { checkSubscription } from '@/lib/subscription'
import { Settings } from 'lucide-react'
import React from 'react'

const SettingsPage = async () => {
  const isPro = await checkSubscription()

  return (
    <div>
      <Heading
        title='Settings'
        description='Manage your account'
        icon={Settings}
        iconColor='text-emerald-500'
        bgColor='bg-emerald-500/10'
      />

      <div className='px-4 lg:px-8 space-y-4'>
        <div className='text-muted-foreground text-sm'>{isPro ? 'You are a pro member' : 'You are a free member'}</div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}

export default SettingsPage
