'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import BottomNav from '@/components/BottomNav'
import { CircleDollarSign, CheckCircle, Send, Star, Clock, User, Lock } from 'lucide-react'

export default function OrderDetailPage({ params }: { params: { id: string } }) {
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
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setUser(data.user))

    fetchOrder()
  }, [params.id, router])

  const fetchOrder = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/orders/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    setOrder(data.order)
  }

  const handlePayment = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const mockTxId = `pi-tx-${Date.now()}`
      
      const res = await fetch('/api/orders/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: params.id,
          piTxId: mockTxId
        })
      })

      const data = await res.json()
      if (data.order) {
        alert('✅ Pembayaran berhasil!')
        fetchOrder()
      }
    } catch (error) {
      alert('Error: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/orders/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'completed' })
      })

      const data = await res.json()
      if (data.order) {
        alert('✅ Order diselesaikan!')
        fetchOrder()
      }
    } catch (error) {
      alert('Error: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    try {
      const token = localStorage.getItem('token')
      const receiverId = user.id === order.buyerId ? order.sellerId : order.buyerId

      await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: params.id,
          receiverId,
          message
        })
      })

      setMessage('')
      fetchOrder()
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: params.id,
          rating: review.rating,
          comment: review.comment
        })
      })

      const data = await res.json()
      if (data.review) {
        alert('✅ Review berhasil dikirim!')
        fetchOrder()
      }
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  if (!order || !user) {
    return (
      <>
        <Navbar />
        <div className="container" style={{marginTop: '80px', textAlign: 'center'}}>
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
      <div className="container" style={{marginTop: '80px'}}>
        <div className="card">
          <h2 style={{fontSize: '1.3rem', marginBottom: '1rem'}}>{order.service.title}</h2>
          <div style={{fontSize: '0.9rem'}}>
            <div style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <CircleDollarSign size={16} />
              <strong>π {order.amount}</strong>
            </div>
            <div style={{marginBottom: '0.5rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Clock size={16} />
              {new Date(order.createdAt).toLocaleDateString('id-ID')}
            </div>
            <div style={{marginBottom: '0.5rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <User size={16} />
              {isBuyer ? order.seller.username : order.buyer.username}
            </div>
            <div style={{marginTop: '0.75rem'}}>
              <span className={`status-badge status-${order.status}`}>
                {order.status === 'pending' && 'Pending Payment'}
                {order.status === 'paid' && 'Paid - In Progress'}
                {order.status === 'completed' && 'Completed'}
              </span>
            </div>
          </div>
        </div>

        {order.status === 'pending' && isBuyer && (
          <button
            onClick={handlePayment}
            disabled={loading}
            className="btn btn-primary"
            style={{width: '100%', fontSize: '1.05rem'}}
          >
            <CircleDollarSign size={20} />
            {loading ? 'Processing...' : 'Bayar dengan Pi'}
          </button>
        )}

        {order.status === 'paid' && isSeller && (
          <button
            onClick={handleComplete}
            disabled={loading}
            className="btn btn-primary"
            style={{width: '100%', fontSize: '1.05rem'}}
          >
            <CheckCircle size={20} />
            {loading ? 'Processing...' : 'Tandai Selesai'}
          </button>
        )}

        {order.status === 'paid' && isBuyer && (
          <div className="info-box info" style={{marginBottom: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'start', gap: '0.5rem'}}>
              <Lock size={18} style={{flexShrink: 0, marginTop: '0.1rem'}} />
              <div>
                <strong style={{display: 'block'}}>Escrow Aktif</strong>
                <p style={{marginTop: '0.25rem'}}>
                  Dana ditahan sampai seller menyelesaikan pekerjaan
                </p>
              </div>
            </div>
          </div>
        )}

        {order.status === 'completed' && (
          <div className="info-box success" style={{marginBottom: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'start', gap: '0.5rem'}}>
              <CheckCircle size={18} style={{flexShrink: 0, marginTop: '0.1rem'}} />
              <div>
                <strong style={{display: 'block'}}>Order Selesai</strong>
                <p style={{marginTop: '0.25rem'}}>
                  Pembayaran telah dirilis ke seller
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h3 style={{marginBottom: '0.75rem', fontSize: '1.1rem'}}>Chat</h3>
          <div className="chat-box">
            {order.chats.length === 0 ? (
              <p style={{color: '#999', textAlign: 'center', padding: '2rem 0'}}>Belum ada chat</p>
            ) : (
              order.chats.map((chat: any) => (
                <div
                  key={chat.id}
                  className={`chat-message ${chat.senderId === user.id ? 'sent' : 'received'}`}
                >
                  <div style={{fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.8rem'}}>
                    {chat.sender.username}
                  </div>
                  <div>{chat.message}</div>
                  <div style={{fontSize: '0.7rem', opacity: 0.7, marginTop: '0.25rem'}}>
                    {new Date(chat.createdAt).toLocaleTimeString('id-ID')}
                  </div>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleSendChat} style={{display: 'flex', gap: '0.5rem'}}>
            <input
              type="text"
              className="input"
              placeholder="Tulis pesan..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{marginBottom: 0}}
            />
            <button type="submit" className="btn btn-primary btn-small">
              <Send size={18} />
            </button>
          </form>
        </div>

        {order.status === 'completed' && isBuyer && !order.review && (
          <div className="card">
            <h3 style={{marginBottom: '0.75rem', fontSize: '1.1rem'}}>Berikan Review</h3>
            <form onSubmit={handleReview}>
              <label className="label">Rating</label>
              <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center'}}>
                {[1,2,3,4,5].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setReview({...review, rating: r})}
                  >
                    <Star 
                      size={32} 
                      fill={r <= review.rating ? '#FFD700' : 'none'} 
                      color={r <= review.rating ? '#FFD700' : '#ccc'}
                      style={{cursor: 'pointer'}}
                    />
                  </button>
                ))}
              </div>
              <label className="label">Komentar (opsional)</label>
              <textarea
                className="textarea"
                placeholder="Bagaimana pengalaman kamu?"
                value={review.comment}
                onChange={(e) => setReview({...review, comment: e.target.value})}
              />
              <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                <Send size={18} />
                Kirim Review
              </button>
            </form>
          </div>
        )}

        {order.review && (
          <div className="card">
            <h3 style={{marginBottom: '0.75rem', fontSize: '1.1rem'}}>Review</h3>
            <div style={{textAlign: 'center'}}>
              <div style={{display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.5rem'}}>
                {[1,2,3,4,5].map(r => (
                  <Star 
                    key={r}
                    size={24} 
                    fill={r <= order.review.rating ? '#FFD700' : 'none'} 
                    color={r <= order.review.rating ? '#FFD700' : '#ccc'}
                  />
                ))}
              </div>
              {order.review.comment && <p style={{color: '#666'}}>{order.review.comment}</p>}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  )
}
