import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb, getAdminAuth } from '@/lib/firebaseAdmin'

async function getUid(req: NextRequest): Promise<string | null> {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null
  try {
    const decoded = await getAdminAuth().verifyIdToken(token)
    return decoded.uid
  } catch {
    return null
  }
}

// GET /api/projects — プロジェクト一覧取得
export async function GET(req: NextRequest) {
  const uid = await getUid(req)
  if (!uid) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const db = getAdminDb()
  const snap = await db.collection('projects')
    .where('ownerUid', '==', uid)
    .orderBy('createdAt', 'desc')
    .get()

  const projects = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  return NextResponse.json({ projects })
}

// POST /api/projects — プロジェクト作成
export async function POST(req: NextRequest) {
  const uid = await getUid(req)
  if (!uid) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { name, url } = await req.json()
  if (!name || !url) return NextResponse.json({ error: 'name and url required' }, { status: 400 })

  const db = getAdminDb()

  // Free plan: 1プロジェクトまで（2クエリを並列実行）
  const [userSnap, existing] = await Promise.all([
    db.collection('users').doc(uid).get(),
    db.collection('projects').where('ownerUid', '==', uid).get(),
  ])
  const plan = userSnap.data()?.plan || 'free'
  if (plan === 'free' && existing.size >= 1) {
    return NextResponse.json({ error: 'free plan allows 1 project' }, { status: 403 })
  }

  const ref = db.collection('projects').doc()
  const monthKey = new Date().toISOString().slice(0, 7)
  const project = {
    id: ref.id,
    name: String(name).slice(0, 50),
    url: String(url).slice(0, 200),
    ownerUid: uid,
    plan,
    createdAt: Date.now(),
    feedbackCount: 0,
    monthlyCount: 0,
    monthKey,
  }
  await ref.set(project)
  return NextResponse.json({ project })
}
