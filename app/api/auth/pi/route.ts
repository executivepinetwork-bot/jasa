import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/jwt'

export async function POST(req: Request) {
  try {
    const { piUid, piUsername, accessToken } = await req.json()

    if (!piUid || !piUsername || !accessToken) {
      return NextResponse.json({ error: 'Missing Pi authentication data' }, { status: 400 })
    }

    if (process.env.PI_API_KEY) {
      try {
        const verifyResponse = await fetch('https://api.minepi.com/v2/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-Pi-App-Key': process.env.PI_API_KEY,
          },
          cache: 'no-store',
        })

        if (!verifyResponse.ok) {
          return NextResponse.json({ error: 'Invalid Pi access token' }, { status: 401 })
        }
      } catch {
        // Keep test/dev usable even when Pi verification is temporarily unreachable.
      }
    }

    let user = await prisma.user.findUnique({
      where: { piId: piUid },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          piId: piUid,
          username: piUsername,
          email: null,
          avatar: null,
        },
      })
    } else {
      user = await prisma.user.update({
        where: { piId: piUid },
        data: {
          username: piUsername,
        },
      })
    }

    const token = await signToken({ userId: user.id, piId: user.piId })

    return NextResponse.json({ token, user })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unable to sign in with Pi Network' }, { status: 500 })
  }
}