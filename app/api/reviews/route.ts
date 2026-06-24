import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/jwt'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 })
  }

  const reviews = await prisma.review.findMany({
    where: { reviewedId: userId },
    include: {
      reviewer: { select: { id: true, username: true, avatar: true } },
      order: { include: { service: { select: { title: true } } } }
    },
    orderBy: { createdAt: 'desc' }
  })

  const avg = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  return NextResponse.json({ reviews, average: avg, total: reviews.length })
}

export async function POST(req: Request) {
  try {
    const payload = await getUserFromRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { orderId, rating, comment } = await req.json()

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order || order.buyerId !== payload.userId || order.status !== 'completed') {
      return NextResponse.json({ error: 'Invalid order' }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        orderId,
        reviewerId: payload.userId as string,
        reviewedId: order.sellerId,
        rating,
        comment
      }
    })

    return NextResponse.json({ review })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
