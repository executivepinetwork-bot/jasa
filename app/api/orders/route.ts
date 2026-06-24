import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/jwt'

export async function GET(req: Request) {
  try {
    const payload = await getUserFromRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'buyer'

    const orders = await prisma.order.findMany({
      where: type === 'buyer' 
        ? { buyerId: payload.userId as string }
        : { sellerId: payload.userId as string },
      include: {
        service: true,
        buyer: { select: { id: true, username: true, avatar: true } },
        seller: { select: { id: true, username: true, avatar: true } },
        review: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ orders })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const payload = await getUserFromRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { serviceId } = await req.json()

    const service = await prisma.service.findUnique({ where: { id: serviceId } })
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const order = await prisma.order.create({
      data: {
        buyerId: payload.userId as string,
        sellerId: service.userId,
        serviceId,
        amount: service.price,
        status: 'pending'
      },
      include: {
        service: true,
        seller: { select: { username: true, piId: true } }
      }
    })

    return NextResponse.json({ order })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
