import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth, getAdminDb } from '@/lib/firebaseAdmin'

async function getUid(req: NextRequest): Promise<string | null> {
  const auth = req.headers.get('Authorization')
  if (!auth?.startsWith('Bearer ')) return null
  try {
    const decoded = await getAdminAuth().verifyIdToken(auth.slice(7))
    return decoded.uid
  } catch {
    return null
  }
}

// PATCH /api/settings/slack — save or delete Slack webhook URL for a project
export async function PATCH(req: NextRequest) {
  const uid = await getUid(req)
  if (!uid) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { projectId, slackWebhookUrl } = await req.json()
  if (!projectId) return NextResponse.json({ error: 'projectId required' }, { status: 400 })

  const db = getAdminDb()
  const projectRef = db.collection('projects').doc(projectId)
  const snap = await projectRef.get()

  if (!snap.exists || snap.data()!.ownerUid !== uid) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  // Pro plan only
  const userSnap = await db.collection('users').doc(uid).get()
  if (userSnap.data()?.plan !== 'pro') {
    return NextResponse.json({ error: 'pro required' }, { status: 403 })
  }

  // Validate URL if provided
  if (slackWebhookUrl) {
    try {
      const u = new URL(slackWebhookUrl)
      if (!u.hostname.endsWith('hooks.slack.com')) {
        return NextResponse.json({ error: 'invalid Slack webhook URL' }, { status: 400 })
      }
    } catch {
      return NextResponse.json({ error: 'invalid URL' }, { status: 400 })
    }
  }

  await projectRef.update({
    slackWebhookUrl: slackWebhookUrl || null,
  })

  return NextResponse.json({ ok: true })
}
