import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb, getAdminAuth } from '@/lib/firebaseAdmin'
import Anthropic from '@anthropic-ai/sdk'

async function getUid(req: NextRequest): Promise<string | null> {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null
  try {
    const decoded = await getAdminAuth().verifyIdToken(token)
    return decoded.uid
  } catch { return null }
}

// POST /api/analyze — フィードバックの感情分析（Pro限定）
export async function POST(req: NextRequest) {
  const uid = await getUid(req)
  if (!uid) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { projectId, feedbackId } = await req.json()
  if (!projectId || !feedbackId) {
    return NextResponse.json({ error: 'projectId and feedbackId required' }, { status: 400 })
  }

  const db = getAdminDb()
  const projectSnap = await db.collection('projects').doc(projectId).get()
  if (!projectSnap.exists || projectSnap.data()?.ownerUid !== uid) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }
  if (projectSnap.data()?.plan !== 'pro') {
    return NextResponse.json({ error: 'pro plan required' }, { status: 403 })
  }

  const feedbackSnap = await db
    .collection('projects').doc(projectId)
    .collection('feedbacks').doc(feedbackId)
    .get()

  if (!feedbackSnap.exists) {
    return NextResponse.json({ error: 'feedback not found' }, { status: 404 })
  }

  const text = feedbackSnap.data()?.text
  const client = new Anthropic()

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 10,
    messages: [{
      role: 'user',
      content: `以下のフィードバックの感情を "positive" / "negative" / "neutral" の1単語で答えてください。\n\n"${text}"`,
    }],
  })

  const raw = (message.content[0] as { text: string }).text.trim().toLowerCase()
  const sentiment = ['positive', 'negative', 'neutral'].includes(raw) ? raw : 'neutral'

  await db.collection('projects').doc(projectId)
    .collection('feedbacks').doc(feedbackId)
    .update({ sentiment })

  return NextResponse.json({ sentiment })
}
