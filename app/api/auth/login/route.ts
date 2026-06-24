import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/jwt'

export async function POST(req: Request) {
  try {
    const { piId, username, email, avatar } = await req.json()

    if (!piId || !username) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let user = await prisma.user.findUnique({ where: { piId } })

    if (!user) {
      user = await prisma.user.create({
        data: { piId, username, email, avatar }
      })
    } else {
      user = await prisma.user.update({
        where: { piId },
        data: { username, email, avatar }
      })
    }

    const token = await signToken({ userId: user.id, piId: user.piId })

    return NextResponse.json({ token, user })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
