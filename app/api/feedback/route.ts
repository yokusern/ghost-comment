import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebaseAdmin'
import { FieldValue } from 'firebase-admin/firestore'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(req: NextRequest) {
  try {
    const { projectId, text, rating, pageUrl, device, sid } = await req.json()

    if (!projectId || typeof projectId !== 'string') {
      return NextResponse.json({ error: 'projectId required' }, { status: 400, headers: CORS_HEADERS })
    }
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: 'text required' }, { status: 400, headers: CORS_HEADERS })
    }
    if (text.length > 1000) {
      return NextResponse.json({ error: 'text too long' }, { status: 400, headers: CORS_HEADERS })
    }

    const db = getAdminDb()
    const projectRef = db.collection('projects').doc(projectId)
    const projectSnap = await projectRef.get()

    if (!projectSnap.exists) {
      return NextResponse.json({ error: 'project not found' }, { status: 404, headers: CORS_HEADERS })
    }

    const project = projectSnap.data()!
    const monthKey = new Date().toISOString().slice(0, 7) // "2026-06"

    // Free plan: 30件/月まで
    if (project.plan !== 'pro' && project.monthKey === monthKey && project.monthlyCount >= 30) {
      return NextResponse.json({ error: 'monthly limit reached' }, { status: 429, headers: CORS_HEADERS })
    }

    const feedbackRef = projectRef.collection('feedbacks').doc()
    const feedback = {
      id: feedbackRef.id,
      projectId,
      text: text.trim(),
      rating: typeof rating === 'number' && rating >= 1 && rating <= 5 ? rating : null,
      pageUrl: typeof pageUrl === 'string' ? pageUrl.slice(0, 500) : '',
      device: device === 'mobile' ? 'mobile' : 'desktop',
      sentiment: null,
      sid: typeof sid === 'string' ? sid.slice(0, 16) : null,
      createdAt: Date.now(),
    }

    await feedbackRef.set(feedback)

    // カウント更新
    const isNewMonth = project.monthKey !== monthKey
    await projectRef.update({
      feedbackCount: FieldValue.increment(1),
      monthlyCount: isNewMonth ? 1 : FieldValue.increment(1),
      monthKey,
    })

    // Slack通知（Pro + webhook設定済み）
    if (project.slackWebhookUrl) {
      const ratingEmoji = ['', '😡', '😕', '😐', '🙂', '😍'][feedback.rating ?? 0] || ''
      const slackBody = {
        text: `👻 *新しいフィードバック* — ${project.name}`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `👻 *新しいフィードバック* — ${project.name}\n${ratingEmoji} _${feedback.pageUrl}_`,
            },
          },
          {
            type: 'section',
            text: { type: 'plain_text', text: feedback.text },
          },
        ],
      }
      fetch(project.slackWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackBody),
      }).catch(() => {}) // fire-and-forget
    }

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS })
  } catch (e) {
    console.error('[feedback]', e)
    return NextResponse.json({ error: 'internal error' }, { status: 500, headers: CORS_HEADERS })
  }
}
