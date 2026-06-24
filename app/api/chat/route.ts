import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/jwt'

export async function POST(req: Request) {
  try {
    const payload = await getUserFromRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { orderId, receiverId, message } = await req.json()

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order || (order.buyerId !== payload.userId && order.sellerId !== payload.userId)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const chat = await prisma.chat.create({
      data: {
        senderId: payload.userId as string,
        receiverId,
        orderId,
        message
      },
      include: {
        sender: { select: { id: true, username: true, avatar: true } }
      }
    })

    return NextResponse.json({ chat })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
