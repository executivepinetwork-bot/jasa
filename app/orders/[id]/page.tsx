'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import BottomNav from '@/components/BottomNav'
import { CircleDollarSign, CheckCircle, Send, Star, Clock, User, Lock } from 'lucide-react'

type PiAuthResponse = {
  user: { uid: string; username: string }
  accessToken: string
}

type PiPaymentCallbacks = {
  onReadyForServerApproval: (paymentId: string) => Promise<void> | void
  onReadyForServerCompletion: (paymentId: string, txid: string) => Promise<void> | void
  onCancel: () => void
  onError: (error: unknown) => void
}

type PiSdk = {
  init: (options: { version: string; sandbox?: boolean }) => void
  authenticate: (
    scopes: string[],
    callbacks: { onIncompletePaymentFound: () => void }
  ) => Promise<PiAuthResponse>
  createPayment: (
    payment: { amount: number; memo: string; metadata: Record<string, unknown> },
    callbacks: PiPaymentCallbacks
  ) => Promise<void>
}

declare global {
  interface Window {
    __piMarketplaceInitialized?: boolean
  }
}

function shouldUseSandbox() {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname.toLowerCase()
  return host.includes('testnet') || host.includes('localhost')
}

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>()
  const orderId = params.id
  const [order, setOrder] = useState<any>(null)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [review, setReview] = useState({ rating: 5, comment: '' })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setUser(data.user))

    if (orderId) {
      fetchOrder(orderId)
    }
  }, [orderId, router])

  const fetchOrder = async (id: string) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    setOrder(data.order)
  }

  const ensurePiSdk = async () => {
    const pi = window.Pi as unknown as PiSdk | undefined
    if (!pi?.authenticate || !pi.createPayment) {
      throw new Error('Pi SDK is not available in this browser yet.')
    }

    if (!window.__piMarketplaceInitialized) {
      pi.init({ version: '2.0', sandbox: shouldUseSandbox() })
      window.__piMarketplaceInitialized = true
    }

    await pi.authenticate(['username', 'payments'], {
      onIncompletePaymentFound: () => {},
    })

    return pi
  }

  const handlePayment = async () => {
    if (!orderId || !order) return

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const pi = await ensurePiSdk()
      const amount = Number(order.amount)

      if (!amount || amount <= 0) {
        throw new Error('Invalid Pi amount for this order.')
      }

      await pi.createPayment(
        {
          amount,
          memo: `Pi Marketplace order ${orderId}`,
          metadata: {
            orderId,
            serviceId: order.serviceId,
            amount,
          },
        },
        {
          onReadyForServerApproval: async (paymentId: string) => {
            const res = await fetch('/api/orders/payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderId,
                paymentId,
                action: 'approve',
              }),
            })

            if (!res.ok) {
              const data = await res.json().catch(() => null)
              throw new Error(data?.error || 'Failed to approve Pi payment.')
            }
          },
          onReadyForServerCompletion: async (paymentId: string, txid: string) => {
            const res = await fetch('/api/orders/payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderId,
                paymentId,
                piTxId: txid,
                action: 'complete',
              }),
            })

            const data = await res.json()
            if (!res.ok) {
              throw new Error(data?.error || 'Failed to finalize Pi payment.')
            }

            alert('Payment successful!')
            fetchOrder(orderId)
            setLoading(false)
          },
          onCancel: () => {
            alert('Payment was cancelled.')
            setLoading(false)
          },
          onError: (error: any) => {
            alert(error?.message || 'Pi payment error.')
            setLoading(false)
          },
        }
      )
    } catch (error: any) {
      alert(error?.message || 'Unable to start Pi checkout.')
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    if (!orderId) return

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'completed' }),
      })

      const data = await res.json()
      if (data.order) {
        alert('Order marked as completed!')
        fetchOrder(orderId)
      }
    } catch (error) {
      alert('Error: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !orderId) return

    try {
      const token = localStorage.getItem('token')
      const receiverId = user.id === order.buyerId ? order.sellerId : order.buyerId

      await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId,
          receiverId,
          message,
        }),
      })

      setMessage('')
      fetchOrder(orderId)
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId) return

    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId,
          rating: review.rating,
          comment: review.comment,
        }),
      })

      const data = await res.json()
      if (data.review) {
        alert('Review submitted successfully!')
        fetchOrder(orderId)
      }
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  if (!order || !user) {
    return (
      <>
        <Navbar />
        <div className="container" style={{ marginTop: '80px', textAlign: 'center' }}>
          <p>Loading...</p>
        </div>
        <BottomNav />
      </>
    )
  }

  const isBuyer = user.id === order.buyerId
  const isSeller = user.id === order.sellerId

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '80px' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{order.service.title}</h2>
          <div style={{ fontSize: '0.9rem' }}>
            <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CircleDollarSign size={16} />
              <strong>Pi {order.amount}</strong>
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} />
              {new Date(order.createdAt).toLocaleDateString('id-ID')}
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} />
              {isBuyer ? order.seller.username : order.buyer.username}
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <span className={`status-badge status-${order.status}`}>
                {order.status === 'pending' && 'Pending Payment'}
                {order.status === 'paid' && 'Paid - In Progress'}
                {order.status === 'completed' && 'Completed'}
              </span>
            </div>
          </div>
        </div>

        {order.status === 'pending' && isBuyer && (
          <button onClick={handlePayment} disabled={loading} className="btn btn-primary" style={{ width: '100%', fontSize: '1.05rem' }}>
            <CircleDollarSign size={20} />
            {loading ? 'Processing...' : 'Pay with Pi'}
          </button>
        )}

        {order.status === 'paid' && isSeller && (
          <button onClick={handleComplete} disabled={loading} className="btn btn-primary" style={{ width: '100%', fontSize: '1.05rem' }}>
            <CheckCircle size={20} />
            {loading ? 'Processing...' : 'Mark as Complete'}
          </button>
        )}

        {order.status === 'paid' && isBuyer && (
          <div className="info-box info" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
              <Lock size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <div>
                <strong style={{ display: 'block' }}>Escrow Active</strong>
                <p style={{ marginTop: '0.25rem' }}>Funds are held until the seller completes the work.</p>
              </div>
            </div>
          </div>
        )}

        {order.status === 'completed' && (
          <div className="info-box success" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
              <CheckCircle size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <div>
                <strong style={{ display: 'block' }}>Order Completed</strong>
                <p style={{ marginTop: '0.25rem' }}>Payment has been released to the seller.</p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Chat</h3>
          <div className="chat-box">
            {order.chats.length === 0 ? (
              <p style={{ color: '#999', textAlign: 'center', padding: '2rem 0' }}>No messages yet</p>
            ) : (
              order.chats.map((chat: any) => (
                <div key={chat.id} className={`chat-message ${chat.senderId === user.id ? 'sent' : 'received'}`}>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.8rem' }}>{chat.sender.username}</div>
                  <div>{chat.message}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.25rem' }}>{new Date(chat.createdAt).toLocaleTimeString('id-ID')}</div>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '0.5rem' }}>
            <input type="text" className="input" placeholder="Write a message..." value={message} onChange={(e) => setMessage(e.target.value)} style={{ marginBottom: 0 }} />
            <button type="submit" className="btn btn-primary btn-small">
              <Send size={18} />
            </button>
          </form>
        </div>

        {order.status === 'completed' && isBuyer && !order.review && (
          <div className="card">
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Leave a Review</h3>
            <form onSubmit={handleReview}>
              <label className="label">Rating</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} type="button" onClick={() => setReview({ ...review, rating: r })}>
                    <Star size={32} fill={r <= review.rating ? '#FFD700' : 'none'} color={r <= review.rating ? '#FFD700' : '#ccc'} style={{ cursor: 'pointer' }} />
                  </button>
                ))}
              </div>
              <label className="label">Comment (optional)</label>
              <textarea className="textarea" placeholder="How was your experience?" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} />
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={18} />
                Submit Review
              </button>
            </form>
          </div>
        )}

        {order.review && (
          <div className="card">
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Review</h3>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((r) => (
                  <Star key={r} size={24} fill={r <= order.review.rating ? '#FFD700' : 'none'} color={r <= order.review.rating ? '#FFD700' : '#ccc'} />
                ))}
              </div>
              {order.review.comment && <p style={{ color: '#666' }}>{order.review.comment}</p>}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  )
}