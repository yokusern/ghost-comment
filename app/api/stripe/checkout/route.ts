import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb, getAdminAuth } from '@/lib/firebaseAdmin'
import { getStripe, PRO_PRICE_ID, APP_URL } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  let uid: string
  try {
    const decoded = await getAdminAuth().verifyIdToken(token)
    uid = decoded.uid
  } catch {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const db = getAdminDb()
  const userSnap = await db.collection('users').doc(uid).get()
  const userData = userSnap.data()!
  let customerId = userData.stripeCustomerId

  if (!customerId) {
    const customer = await getStripe().customers.create({
      email: userData.email,
      metadata: { uid },
    })
    customerId = customer.id
    await db.collection('users').doc(uid).update({ stripeCustomerId: customerId })
  }

  const session = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: PRO_PRICE_ID, quantity: 1 }],
    success_url: `${APP_URL}/dashboard?upgraded=1`,
    cancel_url: `${APP_URL}/settings`,
  })

  return NextResponse.json({ url: session.url })
}
