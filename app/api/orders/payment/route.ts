import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/jwt'

const PI_API_KEY = process.env.PI_API_KEY
const PI_API = 'https://api.minepi.com/v2'

export async function POST(req: Request) {
  try {
    const payload = await getUserFromRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { orderId, action, paymentId, piTxId } = await req.json()

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order || order.buyerId !== payload.userId) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (action === 'approve') {
      if (!paymentId) {
        return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 })
      }
      if (!PI_API_KEY) {
        return NextResponse.json({ error: 'PI_API_KEY is not configured' }, { status: 500 })
      }

      const approveResponse = await fetch(`${PI_API}/payments/${paymentId}/approve`, {
        method: 'POST',
        headers: { Authorization: `Key ${PI_API_KEY}` },
      })

      if (!approveResponse.ok) {
        const approveText = await approveResponse.text()
        return NextResponse.json({ error: approveText || 'Failed to approve Pi payment' }, { status: 502 })
      }

      return NextResponse.json({ ok: true })
    }

    if (action === 'complete') {
      if (!paymentId || !piTxId) {
        return NextResponse.json({ error: 'Payment ID and Pi transaction ID are required' }, { status: 400 })
      }
      if (!PI_API_KEY) {
        return NextResponse.json({ error: 'PI_API_KEY is not configured' }, { status: 500 })
      }

      const completeResponse = await fetch(`${PI_API}/payments/${paymentId}/complete`, {
        method: 'POST',
        headers: {
          Authorization: `Key ${PI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ txid: piTxId }),
      })

      if (!completeResponse.ok) {
        const completeText = await completeResponse.text()
        return NextResponse.json({ error: completeText || 'Failed to complete Pi payment' }, { status: 502 })
      }

      const updated = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'paid',
          piTxId,
        },
      })

      return NextResponse.json({ order: updated })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}