import Link from 'next/link'
import type { Metadata } from 'next'
import { CodeTabs } from '@/components/LP/CodeTabs'

export const metadata: Metadata = {
  title: 'Ghost Comment — Anonymous feedback for your product',
  description: 'One script tag. Real user feedback. AI-powered sentiment analysis. No Firebase setup. No server.',
  openGraph: {
    title: 'Ghost Comment — Anonymous feedback for your product',
    description: 'One script tag. Real user feedback. AI-powered sentiment analysis.',
    url: 'https://ghost-comment-six.vercel.app/en',
    siteName: 'Ghost Comment',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghost Comment — Anonymous feedback for your product',
    description: 'One script tag. Real user feedback. No Firebase setup.',
  },
  alternates: {
    canonical: 'https://ghost-comment-six.vercel.app/en',
    languages: { 'ja': 'https://ghost-comment-six.vercel.app' },
  },
}

const FEATURES = [
  {
    icon: '⚡',
    title: '2 minutes to ship',
    body: 'One script tag or one React component. No Firebase config, no server, no infrastructure decisions.',
  },
  {
    icon: '👻',
    title: 'Fully anonymous',
    body: 'No login. No name required. Anonymous means honest. We store text, device type, and page URL — nothing else.',
  },
  {
    icon: '🧠',
    title: 'Claude AI sentiment',
    body: 'Auto-classify feedback as Positive / Negative / Neutral. Pro users get a weekly Claude-generated digest every Monday.',
  },
  {
    icon: '📊',
    title: 'Dashboard',
    body: 'Daily bar chart, sentiment pie chart, CSV export. Open your browser and everything is there.',
  },
  {
    icon: '🔔',
    title: 'Slack alerts (Pro)',
    body: 'Instant Slack notification the moment feedback arrives. Paste your webhook URL, done.',
  },
  {
    icon: '📈',
    title: 'Industry benchmark (Pro)',
    body: 'Compare your sentiment scores against projects in the same category. Data your self-hosted solution can never produce.',
  },
]

const MOAT = [
  {
    title: 'Data network effect',
    desc: 'As more projects join, industry-wide trends emerge — "SaaS apps average 14% negative rate." No solo implementation ever produces this.',
  },
  {
    title: 'Weekly AI digest (Cron)',
    desc: 'Claude summarizes last week\'s feedback every Monday. "Main theme: confusing UI / 3 mentions." No dashboard visits required.',
  },
  {
    title: 'Anonymous session tracking',
    desc: 'Detects duplicate submissions without cookies or PII. Requires device fingerprinting knowledge to build yourself.',
  },
  {
    title: 'Slack / Linear integration',
    desc: 'Convert negative feedback into Linear issues. Self-hosting means wiring 3 different APIs together.',
  },
]

const COMPARISON = [
  { item: 'Setup time', diy: '20+ hours (Firebase + API + UI)', gc: '2 minutes', win: true },
  { item: 'Infrastructure', diy: 'You maintain Firebase', gc: 'We handle it', win: true },
  { item: 'AI sentiment', diy: 'Build Anthropic API integration', gc: 'Built into dashboard (Pro)', win: true },
  { item: 'Framework support', diy: 'Build your own adapters', gc: 'HTML / React / Next.js / Vue', win: true },
  { item: 'Monthly cost', diy: 'Firebase + dev time', gc: '$0 Free / $10 Pro', win: true },
  { item: 'Code ownership', diy: 'Full control', gc: 'Hosted only', win: false },
]

export default function EnLandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="sticky top-0 z-30 bg-[#0a0a14]/95 backdrop-blur border-b border-white/8">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span>👻</span> Ghost Comment
          </div>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-white/40 hover:text-white text-sm transition-colors hidden sm:block">Docs</Link>
            <Link href="#pricing" className="text-white/40 hover:text-white text-sm transition-colors hidden sm:block">Pricing</Link>
            {/* Language toggle */}
            <div className="flex items-center border border-white/15 rounded-lg overflow-hidden text-xs">
              <Link href="/" className="px-2.5 py-1.5 text-white/40 hover:bg-white/8 transition-colors">🇯🇵</Link>
              <span className="w-px h-4 bg-white/15" />
              <span className="px-2.5 py-1.5 bg-white/10 text-white font-medium">🇺🇸</span>
            </div>
            <Link
              href="/dashboard"
              className="text-sm px-5 py-2 rounded-xl font-semibold bg-white text-[#0a0a14] hover:bg-white/90 transition-all"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-14">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-white/30 text-sm font-mono mb-3">// why I built this</p>
            <blockquote className="border-l-2 border-[#A78BFA] pl-5 mb-8">
              <p className="text-3xl md:text-4xl font-bold leading-tight">
                I built 30 apps in 3 months.<br />
                <span className="text-white/35">Revenue: $0.</span>
              </p>
            </blockquote>
            <p className="text-white/55 leading-relaxed mb-4">
              I had no idea what users thought. No feedback. No direction.
              That&apos;s why good products die.
            </p>
            <p className="text-white/55 leading-relaxed mb-8">
              So I built Ghost Comment.{' '}
              <strong className="text-white">One component. Real feedback. Anonymous.</strong>{' '}
              Built it for myself — which means it solves a problem engineers actually have.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="bg-[#A78BFA] text-white px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-center"
              >
                Try Free
              </Link>
              <Link
                href="/docs"
                className="border border-white/15 text-white/60 px-7 py-3.5 rounded-xl font-semibold hover:bg-white/5 hover:text-white transition-all text-center"
              >
                Read Docs →
              </Link>
            </div>
            <p className="text-white/25 text-xs mt-4">No credit card · Free plan is free forever</p>
          </div>

          <div>
            <CodeTabs />
            <p className="text-white/25 text-xs mt-2 text-right">
              Full integration guide at{' '}
              <Link href="/docs" className="text-[#A78BFA]/60 hover:text-[#A78BFA]">/docs</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── NUMBERS ──────────────────────────────────────────────────────────── */}
      <section className="border-y border-white/8 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '< 2min', sub: 'setup time' },
            { n: '50KB', sub: 'widget size' },
            { n: '0', sub: 'Firebase configs' },
            { n: '4+', sub: 'frameworks' },
          ].map(s => (
            <div key={s.sub}>
              <div className="text-2xl font-bold text-[#A78BFA]">{s.n}</div>
              <div className="text-xs text-white/35 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY NOT DIY ──────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-[#A78BFA] text-xs font-mono mb-3">// you could build it. you shouldn&apos;t.</p>
          <h2 className="text-2xl font-bold mb-3">Spend those 20 hours on your product instead</h2>
          <p className="text-white/45 text-sm leading-relaxed">
            Firebase + API + UI + maintenance is 20+ hours minimum.<br />
            Ghost Comment takes 2 minutes.
          </p>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-6 text-white/40 font-normal"></th>
                <th className="text-left py-3 pr-6 text-white/40 font-normal">Build it yourself</th>
                <th className="text-left py-3 text-[#A78BFA] font-semibold">Ghost Comment</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(r => (
                <tr key={r.item} className="border-b border-white/5">
                  <td className="py-3 pr-6 text-white/60 text-xs">{r.item}</td>
                  <td className="py-3 pr-6 text-white/40 text-xs">{r.diy}</td>
                  <td className={`py-3 text-xs ${r.win ? 'text-green-400' : 'text-white/60'}`}>
                    {r.win && <span className="mr-1">✓</span>}{r.gc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold mb-8 text-center">Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="border border-white/8 rounded-xl p-5 hover:border-white/18 transition-colors">
              <div className="text-xl mb-3">{f.icon}</div>
              <h3 className="font-semibold mb-1.5">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MOAT ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="border border-[#A78BFA]/20 rounded-2xl overflow-hidden">
          <div className="bg-[#A78BFA]/8 px-8 py-6 border-b border-[#A78BFA]/15">
            <p className="text-xs font-mono text-[#A78BFA] mb-2">// what a self-hosted solution can&apos;t do</p>
            <h2 className="text-xl font-bold">Why competitors can&apos;t replicate this</h2>
            <p className="text-white/45 text-sm mt-2">
              Anyone can build the basic collection feature.<br />
              But the insights from thousands of projects? That&apos;s not replicable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-0">
            {MOAT.map((m, i) => (
              <div
                key={m.title}
                className={`p-6 ${i % 2 === 0 ? 'md:border-r border-white/5' : ''} ${i < 2 ? 'border-b border-white/5' : ''}`}
              >
                <h3 className="font-semibold text-white mb-2">{m.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-center mb-10">3 steps</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {[
            { step: '01', title: 'Create a project', desc: 'Sign in with Google → Enter your project name and URL → Get your Project ID. 1 minute.' },
            { step: '02', title: 'Paste one line', desc: 'A script tag, or the GhostComment component. The docs have examples for every framework.' },
            { step: '03', title: 'Feedback arrives', desc: 'Users click 👻 → submit anonymously → instantly in your dashboard. AI classifies the sentiment.' },
          ].map(s => (
            <div key={s.step} className="flex-1 border border-white/8 rounded-xl p-5">
              <p className="font-mono text-sm text-[#A78BFA]/50 mb-2">{s.step}</p>
              <h3 className="font-semibold mb-1.5">{s.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WIDGET PREVIEW ───────────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <h2 className="text-lg font-bold text-center mb-6">What it looks like</h2>
        <div className="border border-white/8 rounded-2xl overflow-hidden">
          <div className="bg-[#13131f] h-24 flex items-center justify-center text-white/10 text-xs border-b border-white/5">
            your product
          </div>
          <div className="relative bg-[#0a0a14] h-72">
            <div className="absolute bottom-5 right-5 flex flex-col items-end gap-3">
              <div className="bg-[#16162a] border border-[#A78BFA]/30 rounded-2xl p-4 w-64 shadow-2xl">
                <p className="text-white text-xs font-semibold mb-2">Send Feedback</p>
                <div className="flex justify-between mb-3 text-lg">
                  {['😡','😕','😐','🙂','😍'].map(e => <span key={e}>{e}</span>)}
                </div>
                <div className="bg-white/6 border border-white/10 rounded-lg h-14 px-3 py-2 mb-3">
                  <span className="text-white/20 text-xs">Tell us what you really think...</span>
                </div>
                <div className="py-2 text-center text-white text-xs font-semibold rounded-lg bg-[#A78BFA]">
                  Submit
                </div>
                <p className="text-center text-white/15 text-[10px] mt-2">Powered by Ghost Comment</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg bg-[#A78BFA]">
                👻
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-white/25 text-xs mt-3">
          color / position / prompt are customizable{' '}
          <Link href="/docs#customization" className="text-[#A78BFA]/60 hover:text-[#A78BFA]">→ Docs</Link>
        </p>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────────── */}
      <section id="pricing" className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-xl font-bold text-center mb-2">Pricing</h2>
        <p className="text-center text-white/35 text-sm mb-10">Unusually honest for an AI tool — Free actually works</p>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-1">Free</h3>
            <p className="text-3xl font-bold mb-0.5">$0</p>
            <p className="text-white/30 text-xs mb-6">Free forever</p>
            <ul className="space-y-2 text-sm mb-7">
              {[
                ['1 project', true],
                ['30 feedbacks / month', true],
                ['Dashboard + charts', true],
                ['AI sentiment analysis', false],
                ['Weekly AI digest', false],
                ['Slack notifications', false],
                ['CSV export', false],
              ].map(([label, active]) => (
                <li key={label as string} className={active ? 'text-white/70' : 'text-white/20'}>
                  {active ? '✓' : '✗'} {label}
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className="block text-center border border-white/15 text-white/60 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/5 hover:text-white transition-all"
            >
              Start Free
            </Link>
          </div>
          <div className="border border-[#A78BFA]/40 rounded-2xl p-6 relative bg-[#A78BFA]/5">
            <div className="absolute -top-3 left-6 bg-[#A78BFA] text-white text-xs px-3 py-1 rounded-full font-semibold">
              Recommended
            </div>
            <h3 className="font-bold text-lg mb-1 text-[#A78BFA]">Pro</h3>
            <p className="text-3xl font-bold mb-0.5">$10<span className="text-sm font-normal text-white/40">/mo</span></p>
            <p className="text-white/30 text-xs mb-6">Cancel anytime</p>
            <ul className="space-y-2 text-sm mb-7 text-white/75">
              {[
                'Unlimited projects',
                'Unlimited feedback',
                'Claude AI sentiment analysis',
                'Weekly AI digest (every Monday)',
                'Slack notifications',
                'CSV export',
                'Remove "Powered by" badge',
                'Industry benchmark comparison',
              ].map(label => (
                <li key={label}>✓ {label}</li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className="block text-center bg-[#A78BFA] text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Start Pro
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-28 text-center">
        <p className="text-white/25 font-mono text-sm mb-5">// one last thing</p>
        <h2 className="text-3xl font-bold mb-4">
          Your users have opinions.<br />
          They just won&apos;t tell you —<br />
          <span className="text-white/50">unless it&apos;s anonymous.</span>
        </h2>
        <p className="text-white/45 mb-8 leading-relaxed">
          Add Ghost Comment today.<br />
          By tomorrow you&apos;ll know what your users actually think.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-[#A78BFA] text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Start Free Today
        </Link>
        <p className="text-white/20 text-xs mt-4">No credit card · 2-minute setup</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold flex items-center gap-2">
            <span>👻</span> Ghost Comment
          </div>
          <div className="flex gap-6 text-sm text-white/35">
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>
            <a href="https://github.com/yokusern/ghost-comment" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portfolio</a>
          </div>
          <p className="text-white/15 text-xs">Made by YO-KO</p>
        </div>
      </footer>
    </div>
  )
}
