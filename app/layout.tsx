import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/hooks/useAuth'

export const metadata: Metadata = {
  metadataBase: new URL('https://ghost-comment.vercel.app'),
  title: 'Ghost Comment — 匿名フィードバックウィジェット',
  description: '1行のscriptタグを貼るだけ。ユーザーがログイン不要で本音を送れる匿名フィードバック収集ツール。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
