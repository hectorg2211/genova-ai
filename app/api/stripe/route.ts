import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'

const settingsUrl = absoluteUrl('/settings')

export async function GET() {
  try {
    const { userId } = await auth()

    const user = await currentUser()

    if (!userId || !user) return new NextResponse('Unauthorized', { status: 401 })

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    })

    if (userSubscription && userSubscription?.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }), { status: 200 })
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Genova AI Pro',
              description: 'Unlimited AI generations',
            },
            unit_amount: 2000,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
      subscription_data: {
        metadata: {
          userId,
        },
      },
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }), { status: 200 })
  } catch (error) {
    console.log('Stripe error', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
