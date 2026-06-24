'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'
import type { Feedback } from '@/types'

const COLORS = { positive: '#4ade80', negative: '#f87171', neutral: '#94a3b8' }
const LABELS = { positive: 'ポジティブ', negative: 'ネガティブ', neutral: 'ニュートラル' }

export default function StatsPanel({ feedbacks }: { feedbacks: Feedback[] }) {
  if (feedbacks.length === 0) return null

  // Sentiment pie
  const sentimentCounts = feedbacks.reduce((acc, f) => {
    if (f.sentiment) acc[f.sentiment] = (acc[f.sentiment] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const pieData = Object.entries(sentimentCounts).map(([name, value]) => ({ name, value }))

  // Daily bar chart (last 14 days)
  const now = Date.now()
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now - (13 - i) * 86400000)
    return d.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
  })
  const dayMap = days.reduce((acc, d) => { acc[d] = 0; return acc }, {} as Record<string, number>)
  feedbacks.forEach(f => {
    const d = new Date(f.createdAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
    if (d in dayMap) dayMap[d]++
  })
  const barData = days.map(d => ({ day: d, count: dayMap[d] }))

  // Keywords (simple word frequency from text)
  const wordFreq: Record<string, number> = {}
  feedbacks.forEach(f => {
    f.text.split(/[\s、。「」【】\n]+/).forEach(w => {
      if (w.length >= 2 && w.length <= 10) wordFreq[w] = (wordFreq[w] || 0) + 1
    })
  })
  const topWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Daily bar */}
      <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="text-white/60 text-xs mb-3">日別フィードバック数（14日間）</p>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={barData}>
            <XAxis dataKey="day" tick={{ fill: '#ffffff40', fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: '#16162a', border: '1px solid rgba(167,139,250,.3)', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#A78BFA' }}
            />
            <Bar dataKey="count" fill="#A78BFA" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sentiment pie */}
      {pieData.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-xs mb-3">感情分布</p>
          <ResponsiveContainer width="100%" height={100}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={28} outerRadius={46} dataKey="value">
                {pieData.map(entry => (
                  <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, n) => [v, LABELS[n as keyof typeof LABELS] || n]}
                contentStyle={{ background: '#16162a', border: '1px solid rgba(167,139,250,.3)', borderRadius: 8, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Keywords */}
      {topWords.length > 0 && (
        <div className="md:col-span-3 bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-xs mb-3">よく言及されるキーワード</p>
          <div className="flex flex-wrap gap-2">
            {topWords.map(([word, count]) => (
              <span
                key={word}
                className="px-3 py-1 rounded-full text-sm border border-purple-500/30 text-purple-300"
                style={{ opacity: 0.4 + count * 0.1 }}
              >
                {word}
                <span className="ml-1.5 text-xs text-white/40">{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
