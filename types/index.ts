export type Plan = 'free' | 'pro'

export interface UserDoc {
  uid: string
  email: string
  displayName: string
  photoURL: string
  plan: Plan
  stripeCustomerId?: string
  createdAt: number
}

export interface Project {
  id: string
  name: string
  url: string
  ownerUid: string
  createdAt: number
  feedbackCount: number
  monthlyCount: number
  monthKey: string // "2026-06"
}

export interface Feedback {
  id: string
  projectId: string
  text: string
  rating: number | null // 1-5
  pageUrl: string
  device: 'mobile' | 'desktop'
  sentiment: 'positive' | 'negative' | 'neutral' | null
  createdAt: number
}
