import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/jwt'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  const services = await prisma.service.findMany({
    where: {
      active: true,
      ...(category && { category }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    },
    include: {
      user: { select: { id: true, username: true, avatar: true } }
    },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json({ services })
}

export async function POST(req: Request) {
  try {
    const payload = await getUserFromRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, price, category, deliveryDays, image } = await req.json()

    const service = await prisma.service.create({
      data: {
        title,
        description,
        price,
        category,
        deliveryDays,
        image,
        userId: payload.userId as string
      }
    })

    return NextResponse.json({ service })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
