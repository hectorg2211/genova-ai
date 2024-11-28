import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

    if (!session?.metadata?.userId) {
      return new NextResponse('Missing user ID', { status: 400 })
    }

    await prismadb.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: subscription?.id,
        stripeCustomerId: subscription?.customer as string,
        stripePriceId: subscription?.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription?.current_period_end * 1000),
      },
    })
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

    await prismadb.userSubscription.update({
      where: {
        // @ts-expect-error subscription does exist
        userId: session?.subscription_details?.metadata?.userId,
      },
      data: {
        stripePriceId: subscription?.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription?.current_period_end * 1000),
      },
    })
  }

  return new NextResponse(null, { status: 200 })
}
