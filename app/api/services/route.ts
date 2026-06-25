import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/jwt'
import { ensureDummyStoreData } from '@/lib/dummy-store'

function buildServiceWhere(category: string | null, search: string | null) {
  return {
    active: true,
    ...(category && { category }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  const where = buildServiceWhere(category, search)

  let services = await prisma.service.findMany({
    where,
    include: {
      user: { select: { id: true, username: true, avatar: true } },
    },
    orderBy: [{ price: 'asc' }, { createdAt: 'desc' }],
  })

  if (services.length === 0) {
    const activeServiceCount = await prisma.service.count({ where: { active: true } })
    if (activeServiceCount === 0) {
      await ensureDummyStoreData(prisma)
      services = await prisma.service.findMany({
        where,
        include: {
          user: { select: { id: true, username: true, avatar: true } },
        },
        orderBy: [{ price: 'asc' }, { createdAt: 'desc' }],
      })
    }
  }

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
        userId: payload.userId as string,
      },
    })

    return NextResponse.json({ service })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}