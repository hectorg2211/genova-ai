'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface SubscriptionButtonProps {
  isPro: boolean
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ isPro = false }) => {
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe')
      window.location.href = response.data.url
    } catch (error) {
      console.log('Billing error', error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant={isPro ? 'default' : 'premium'} onClick={onClick} disabled={loading}>
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Zap className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  )
}

export default SubscriptionButton
