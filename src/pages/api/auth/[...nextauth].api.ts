import NextAuth from 'next-auth/next'
import { NextAuthOptions } from 'next-auth'
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'

import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import { PrismaAdapter } from '~/lib/auth/prisma-adapter'

export function buildAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        profile: (profile: GithubProfile) => {
          return {
            id: profile.id.toString(),
            name: profile.name ?? profile.login,
            avatar_url: profile.avatar_url,
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        profile: (profile: GoogleProfile) => {
          return {
            id: profile.sub,
            name: profile.name,
            avatar_url: profile.picture,
          }
        },
      }),
    ],
    callbacks: {
      session: ({ session, user }) => {
        return { ...session, user }
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildAuthOptions(req, res))
}
