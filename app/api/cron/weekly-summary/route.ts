import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebaseAdmin'
import Anthropic from '@anthropic-ai/sdk'

// Vercel Cron: every Monday at 9:00 JST (00:00 UTC)
// vercel.json: { "crons": [{ "path": "/api/cron/weekly-summary", "schedule": "0 0 * * 1" }] }

export async function GET(req: NextRequest) {
  // Vercel Cron secret check
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const db = getAdminDb()

  // Get all Pro projects
  const projectsSnap = await db.collection('projects').where('plan', '==', 'pro').get()
  if (projectsSnap.empty) return NextResponse.json({ ok: true, processed: 0 })

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  let processed = 0

  for (const projectDoc of projectsSnap.docs) {
    const project = projectDoc.data()

    // Get feedbacks from the last 7 days
    const feedbacksSnap = await projectDoc.ref
      .collection('feedbacks')
      .where('createdAt', '>', oneWeekAgo)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get()

    if (feedbacksSnap.empty) continue

    const texts = feedbacksSnap.docs
      .map(d => d.data().text as string)
      .filter(Boolean)
      .join('\n---\n')

    // Generate summary with Claude
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `以下は「${project.name}」に届いた今週のユーザーフィードバック${feedbacksSnap.size}件です。
3〜5行で要約してください。
- 多く言及されたテーマ
- ネガティブなフィードバックの主な内容
- 開発者が最初に対応すべきこと
---
${texts}`,
        },
      ],
    })

    const summary = msg.content[0].type === 'text' ? msg.content[0].text : ''

    // Save summary to Firestore
    await projectDoc.ref.collection('weeklySummaries').add({
      summary,
      feedbackCount: feedbacksSnap.size,
      createdAt: Date.now(),
    })

    // Send to Slack if configured
    if (project.slackWebhookUrl) {
      const slackBody = {
        text: `📊 *Ghost Comment 週次サマリー* — ${project.name}`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `📊 *Ghost Comment 週次サマリー* — ${project.name}\n今週のフィードバック: ${feedbacksSnap.size}件`,
            },
          },
          {
            type: 'section',
            text: { type: 'mrkdwn', text: summary },
          },
        ],
      }
      await fetch(project.slackWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackBody),
      })
    }

    processed++
  }

  return NextResponse.json({ ok: true, processed })
}
