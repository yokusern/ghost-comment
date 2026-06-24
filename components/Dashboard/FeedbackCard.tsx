'use client'
import type { Feedback } from '@/types'

const EMOJI = ['', '😡', '😕', '😐', '🙂', '😍']
const SENTIMENT_STYLE: Record<string, string> = {
  positive: 'bg-green-500/15 text-green-400 border-green-500/30',
  negative: 'bg-red-500/15 text-red-400 border-red-500/30',
  neutral: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
}
const SENTIMENT_LABEL: Record<string, string> = {
  positive: 'ポジティブ', negative: 'ネガティブ', neutral: 'ニュートラル',
}

export default function FeedbackCard({ fb, onAnalyze }: { fb: Feedback; onAnalyze?: (id: string) => void }) {
  const date = new Date(fb.createdAt).toLocaleDateString('ja-JP', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
  const domain = fb.pageUrl ? (() => { try { return new URL(fb.pageUrl).pathname } catch { return fb.pageUrl } })() : ''

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-white text-sm leading-relaxed flex-1">{fb.text}</p>
        {fb.rating && <span className="text-xl shrink-0">{EMOJI[fb.rating]}</span>}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {fb.sentiment ? (
          <span className={`text-xs px-2 py-0.5 rounded-full border ${SENTIMENT_STYLE[fb.sentiment]}`}>
            {SENTIMENT_LABEL[fb.sentiment]}
          </span>
        ) : onAnalyze ? (
          <button
            onClick={() => onAnalyze(fb.id)}
            className="text-xs px-2 py-0.5 rounded-full border border-purple-500/40 text-purple-400 hover:bg-purple-500/10 transition-colors"
          >
            感情分析
          </button>
        ) : null}
        <span className="text-xs text-white/30">{fb.device === 'mobile' ? '📱' : '🖥'}</span>
        {domain && <span className="text-xs text-white/30 truncate max-w-[160px]">{domain}</span>}
        <span className="text-xs text-white/30 ml-auto">{date}</span>
      </div>
    </div>
  )
}
