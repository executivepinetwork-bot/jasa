import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/jwt'
import { ensureDummyStoreData } from '@/lib/dummy-store'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(req: Request, context: RouteContext) {
  const { id } = await context.params

  let service = await prisma.service.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, username: true, avatar: true, bio: true } },
    },
  })

  if (!service) {
    await ensureDummyStoreData(prisma)
    service = await prisma.service.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, username: true, avatar: true, bio: true } },
      },
    })
  }

  if (!service) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 })
  }

  return NextResponse.json({ service })
}

export async function PATCH(req: Request, context: RouteContext) {
  try {
    const payload = await getUserFromRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const service = await prisma.service.findUnique({ where: { id } })
    if (service?.userId !== payload.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await req.json()
    const updated = await prisma.service.update({
      where: { id },
      data,
    })

    return NextResponse.json({ service: updated })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, context: RouteContext) {
  try {
    const payload = await getUserFromRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const service = await prisma.service.findUnique({ where: { id } })
    if (service?.userId !== payload.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.service.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}