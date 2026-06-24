'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import BottomNav from '@/components/BottomNav'
import { ShoppingCart, Clock, Tag, Shield, Palette, Code, PenTool, Megaphone, Package, User, CheckCircle } from 'lucide-react'

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/services/${params.id}`)
      .then(r => r.json())
      .then(data => setService(data.service))
  }, [params.id])

  const handleOrder = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Silakan login terlebih dahulu')
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ serviceId: params.id })
      })

      const data = await res.json()

      if (data.order) {
        alert('✅ Order dibuat! Silakan bayar dengan Pi')
        router.push(`/orders/${data.order.id}`)
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      alert('Error: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (cat: string) => {
    const iconProps = { size: 48, strokeWidth: 1.5 }
    switch(cat) {
      case 'design': return <Palette {...iconProps} />
      case 'programming': return <Code {...iconProps} />
      case 'writing': return <PenTool {...iconProps} />
      case 'marketing': return <Megaphone {...iconProps} />
      default: return <Package {...iconProps} />
    }
  }

  if (!service) {
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

  return (
    <>
      <Navbar />
      <div className="container" style={{marginTop: '80px'}}>
        {service.image ? (
          <img 
            src={service.image} 
            alt={service.title} 
            style={{
              width: '100%', 
              height: '240px',
              objectFit: 'cover',
              borderRadius: '12px', 
              marginBottom: '1rem',
              border: '1px solid #E2E8F0'
            }} 
          />
        ) : (
          <div style={{
            width: '100%',
            height: '240px',
            background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
            borderRadius: '12px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#7C3AED',
            border: '1px solid #E2E8F0'
          }}>
            {getCategoryIcon(service.category)}
          </div>
        )}

        <div className="card">
          <div style={{
            display: 'inline-block',
            padding: '0.375rem 0.75rem',
            background: '#F5F3FF',
            color: '#7C3AED',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1rem'
          }}>
            {service.category}
          </div>

          <h1 style={{
            fontSize: '1.5rem', 
            marginBottom: '1.25rem', 
            fontWeight: 700, 
            color: '#1A202C', 
            lineHeight: '1.3',
            letterSpacing: '-0.02em'
          }}>
            {service.title}
          </h1>
          
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            paddingBottom: '1.25rem', 
            marginBottom: '1.25rem',
            borderBottom: '1px solid #E2E8F0'
          }}>
            <div className="avatar" style={{width: '40px', height: '40px'}}>
              <User size={20} />
            </div>
            <div>
              <div style={{fontWeight: 600, fontSize: '0.95rem', color: '#1A202C'}}>
                {service.user.username}
              </div>
              {service.user.bio && (
                <div style={{fontSize: '0.8rem', color: '#64748B', marginTop: '0.125rem'}}>
                  {service.user.bio}
                </div>
              )}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              padding: '1rem',
              background: '#F9FAFB',
              borderRadius: '10px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#64748B',
                fontSize: '0.8rem',
                marginBottom: '0.5rem'
              }}>
                <Clock size={14} />
                Waktu Pengerjaan
              </div>
              <div style={{fontSize: '1.25rem', fontWeight: 700, color: '#1A202C'}}>
                {service.deliveryDays} Hari
              </div>
            </div>

            <div style={{
              padding: '1rem',
              background: '#F9FAFB',
              borderRadius: '10px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#64748B',
                fontSize: '0.8rem',
                marginBottom: '0.5rem'
              }}>
                <Tag size={14} />
                Harga
              </div>
              <div style={{fontSize: '1.5rem', fontWeight: 700, color: '#7C3AED'}}>
                π {service.price}
              </div>
            </div>
          </div>

          <button
            onClick={handleOrder}
            disabled={loading}
            className="btn btn-primary"
            style={{width: '100%', fontSize: '1.05rem', padding: '1rem', marginBottom: '1rem'}}
          >
            <ShoppingCart size={20} strokeWidth={2} />
            {loading ? 'Processing...' : 'Order Sekarang'}
          </button>

          <div className="info-box success">
            <div style={{display: 'flex', alignItems: 'start', gap: '0.75rem'}}>
              <Shield size={20} style={{flexShrink: 0, marginTop: '0.1rem'}} />
              <div>
                <strong style={{display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem'}}>
                  Pembayaran Dilindungi Escrow
                </strong>
                <p style={{fontSize: '0.85rem', lineHeight: '1.5'}}>
                  Dana Anda akan ditahan dengan aman hingga pekerjaan selesai sesuai kesepakatan. Jika tidak puas, dana akan dikembalikan.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{
            fontSize: '1.1rem', 
            fontWeight: 600, 
            marginBottom: '1rem', 
            color: '#1A202C',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle size={20} color="#7C3AED" />
            Deskripsi Layanan
          </h3>
          <p style={{
            lineHeight: '1.7', 
            whiteSpace: 'pre-wrap', 
            color: '#475569',
            fontSize: '0.95rem'
          }}>
            {service.description}
          </p>
        </div>
      </div>
      <BottomNav />
    </>
  )
}
