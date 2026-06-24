import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/jwt'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(req: Request, context: RouteContext) {
  try {
    const payload = await getUserFromRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        service: true,
        buyer: { select: { id: true, username: true, avatar: true } },
        seller: { select: { id: true, username: true, avatar: true } },
        chats: {
          include: {
            sender: { select: { id: true, username: true, avatar: true } }
          },
          orderBy: { createdAt: 'asc' }
        },
        review: true
      }
    })

    if (!order || (order.buyerId !== payload.userId && order.sellerId !== payload.userId)) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({ order })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req: Request, context: RouteContext) {
  try {
    const payload = await getUserFromRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { status } = await req.json()
    const { id } = await context.params

    const order = await prisma.order.findUnique({ where: { id } })
    if (!order || order.sellerId !== payload.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        status,
        ...(status === 'completed' && { completedAt: new Date() })
      }
    })

    return NextResponse.json({ order: updated })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}