import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'

export function PrismaAdapter(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): Adapter {
  return {
    async createUser(user) {
      const newUser = await prisma.user.create({
        data: { name: user.name, avatar_url: user.avatar_url },
      })

      return {
        id: newUser.id,
        name: newUser.name,
        avatar_url: newUser.avatar_url,
        email: undefined!,
        emailVerified: null,
      }
    },
    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) return null

      return {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url!,
        email: undefined!,
        emailVerified: null,
      }
    },
    async getUserByEmail(email: string) {
      return null
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) return null

      const { user } = account

      return {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url!,
        email: undefined!,
        emailVerified: null,
      }
    },
    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: undefined!,
        avatar_url: updatedUser.avatar_url!,
        emailVerified: null,
      }
    },
    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          acess_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },
    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: { user_id: userId, expires, session_token: sessionToken },
      })

      return {
        userId,
        expires,
        sessionToken,
      }
    },
    async getSessionAndUser(sessionToken) {
      const sessionWithUser = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })
      if (!sessionWithUser) return null

      const { user } = sessionWithUser

      return {
        session: {
          userId: sessionWithUser.user_id,
          expires: sessionWithUser.expires,
          sessionToken: sessionWithUser.session_token,
        },
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url!,
          email: undefined!,
          emailVerified: null,
        },
      }
    },
    async updateSession({ sessionToken, userId, expires }) {
      const updatedSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          user_id: userId,
          expires,
        },
      })

      return {
        userId: updatedSession.user_id,
        expires: updatedSession.expires,
        sessionToken: updatedSession.session_token,
      }
    },
    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
  }
}
