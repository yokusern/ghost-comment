import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getAdminDb } from '@/lib/firebaseAdmin'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 })
  }

  const db = getAdminDb()

  if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string
    const isActive = sub.status === 'active'

    const usersSnap = await db.collection('users')
      .where('stripeCustomerId', '==', customerId).get()

    for (const userDoc of usersSnap.docs) {
      await userDoc.ref.update({ plan: isActive ? 'pro' : 'free' })
      // プロジェクトのplanも同期
      const projectsSnap = await db.collection('projects')
        .where('ownerUid', '==', userDoc.id).get()
      for (const p of projectsSnap.docs) {
        await p.ref.update({ plan: isActive ? 'pro' : 'free' })
      }
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string
    const usersSnap = await db.collection('users')
      .where('stripeCustomerId', '==', customerId).get()
    for (const userDoc of usersSnap.docs) {
      await userDoc.ref.update({ plan: 'free' })
      const projectsSnap = await db.collection('projects')
        .where('ownerUid', '==', userDoc.id).get()
      for (const p of projectsSnap.docs) {
        await p.ref.update({ plan: 'free' })
      }
    }
  }

  return NextResponse.json({ received: true })
}
