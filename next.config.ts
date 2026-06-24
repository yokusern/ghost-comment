import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['firebase-admin', 'stripe', '@anthropic-ai/sdk'],
}

export default nextConfig
