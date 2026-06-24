'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { ShoppingBag, Briefcase, Package, Clock, CircleDollarSign, CheckCircle, User, ArrowRight } from 'lucide-react'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [type, setType] = useState('buyer')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetch(`/api/orders?type=${type}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setOrders(data.orders || []))
  }, [type, router])

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock size={14} strokeWidth={2} />
      case 'paid': return <CircleDollarSign size={14} strokeWidth={2} />
      case 'completed': return <CheckCircle size={14} strokeWidth={2} />
      default: return <Clock size={14} strokeWidth={2} />
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return { bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', text: '#92400E', border: '#FCD34D' }
      case 'paid': return { bg: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)', text: '#1E40AF', border: '#93C5FD' }
      case 'completed': return { bg: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)', text: '#065F46', border: '#6EE7B7' }
      default: return { bg: '#F1F5F9', text: '#64748B', border: '#E2E8F0' }
    }
  }

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return 'Menunggu'
      case 'paid': return 'Dibayar'
      case 'completed': return 'Selesai'
      default: return status
    }
  }

  return (
    <>
      <div style={{background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DBEAFE 100%)', minHeight: '100vh', paddingBottom: '80px'}}>
        {/* Header */}
        <div style={{background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', paddingTop: '1rem', paddingBottom: '1rem'}}>
          <div className="container" style={{marginTop: 0, paddingTop: 0, paddingBottom: 0}}>
            <h1 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#fff', letterSpacing: '-0.02em'}}>
              Pesanan
            </h1>

            {/* Tab Buttons */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem'}}>
              <button
                onClick={() => setType('buyer')}
                style={{
                  background: type === 'buyer' ? '#fff' : 'rgba(255,255,255,0.2)',
                  color: type === 'buyer' ? '#3B82F6' : '#fff',
                  border: type === 'buyer' ? 'none' : '1px solid rgba(255,255,255,0.3)',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                  boxShadow: type === 'buyer' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <ShoppingBag size={18} strokeWidth={2} />
                Pembelian
              </button>
              <button
                onClick={() => setType('seller')}
                style={{
                  background: type === 'seller' ? '#fff' : 'rgba(255,255,255,0.2)',
                  color: type === 'seller' ? '#3B82F6' : '#fff',
                  border: type === 'seller' ? 'none' : '1px solid rgba(255,255,255,0.3)',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                  boxShadow: type === 'seller' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <Briefcase size={18} strokeWidth={2} />
                Penjualan
              </button>
            </div>
          </div>
        </div>

        <div className="container" style={{marginTop: '1rem'}}>
          {orders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(226,232,240,0.5)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: '#3B82F6'
              }}>
                <Package size={36} strokeWidth={2} />
              </div>
              <h3 style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1A202C'}}>
                Belum Ada Pesanan
              </h3>
              <p style={{color: '#64748B', marginBottom: '1.5rem', fontSize: '0.9rem'}}>
                Mulai belanja jasa atau jual keahlian Anda
              </p>
              <Link href="/services" className="btn btn-primary">
                Jelajahi Jasa
              </Link>
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              {orders.map((order: any) => {
                const statusColor = getStatusColor(order.status)
                return (
                  <Link href={`/orders/${order.id}`} key={order.id} style={{textDecoration: 'none', color: 'inherit'}}>
                    <div style={{
                      background: '#fff',
                      borderRadius: '16px',
                      padding: '1.25rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      transition: 'all 0.2s',
                      border: '1px solid rgba(226,232,240,0.5)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Decorative line */}
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        background: statusColor.bg
                      }} />

                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem'}}>
                        <div style={{flex: 1, paddingRight: '1rem'}}>
                          <h3 style={{
                            marginBottom: '0.5rem',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#1A202C',
                            letterSpacing: '-0.01em',
                            lineHeight: '1.4'
                          }}>
                            {order.service.title}
                          </h3>
                          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff'
                            }}>
                              <User size={12} strokeWidth={2} />
                            </div>
                            <span style={{fontSize: '0.85rem', color: '#64748B', fontWeight: 500}}>
                              {type === 'buyer' ? order.seller.username : order.buyer.username}
                            </span>
                          </div>
                        </div>
                        <div style={{
                          background: statusColor.bg,
                          color: statusColor.text,
                          padding: '0.5rem 0.875rem',
                          borderRadius: '10px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          border: `1px solid ${statusColor.border}`,
                          whiteSpace: 'nowrap'
                        }}>
                          {getStatusIcon(order.status)}
                          {getStatusLabel(order.status)}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid #F1F5F9'
                      }}>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: '#7C3AED',
                          letterSpacing: '-0.02em'
                        }}>
                          π {order.amount}
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <span style={{fontSize: '0.8rem', color: '#94A3B8', fontWeight: 500}}>
                            {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <ArrowRight size={16} color="#7C3AED" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  )
}
