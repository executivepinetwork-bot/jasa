'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import BottomNav from '@/components/BottomNav'
import { User, Star, Target, ShoppingBag, Briefcase, Calendar, LogIn, LogOut, Settings, Award, TrendingUp, Package, Shield, FileText } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [reviews, setReviews] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoggedIn(false)
      return
    }

    setIsLoggedIn(true)
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        setUser(data.user)
        
        fetch(`/api/reviews?userId=${data.user.id}`)
          .then(r => r.json())
          .then(reviewData => setReviews(reviewData))
      })
      .catch(() => {
        toast.error('Gagal memuat profil')
      })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    toast.success('Berhasil logout')
    router.push('/')
  }


  if (!isLoggedIn) {
    return (
      <>
        <div style={{background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DBEAFE 100%)', minHeight: 'calc(100vh - 80px)'}}>
          <div className="container" style={{paddingTop: '3rem'}}>
            <div className="card" style={{textAlign: 'center', padding: '3rem 2rem', maxWidth: '400px', margin: '0 auto'}}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '4px solid #7C3AED',
                boxShadow: '0 8px 24px rgba(124,58,237,0.2)'
              }}>
                <User size={48} color="#7C3AED" strokeWidth={2} />
              </div>
              <h2 style={{fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1A202C', letterSpacing: '-0.02em'}}>
                Akses Profil
              </h2>
              <p style={{color: '#64748B', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.6'}}>
                Login untuk melihat profil dan mengakses semua fitur marketplace
              </p>
              <button onClick={() => router.push('/login')} className="btn btn-primary" style={{width: '100%'}}>
                <LogIn size={20} />
                Sign in with Pi Network
              </button>
            </div>
          </div>
        </div>
        <BottomNav />
      </>
    )
  }

  if (!user) {
    return (
      <>
        <div className="container" style={{marginTop: '2rem', textAlign: 'center'}}>
          <div className="animate-pulse">
            <div style={{width: '80px', height: '80px', background: '#E2E8F0', borderRadius: '50%', margin: '0 auto 1rem'}}></div>
            <div style={{width: '150px', height: '24px', background: '#E2E8F0', borderRadius: '8px', margin: '0 auto 0.5rem'}}></div>
          </div>
        </div>
        <BottomNav />
      </>
    )
  }

  return (
    <>
      {/* Header Section */}
      <div style={{background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', paddingTop: '1rem', paddingBottom: '1rem'}}>
        <div className="container" style={{marginTop: 0, paddingTop: 0, paddingBottom: 0}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem'}}>
            <h1 style={{fontSize: '1.25rem', fontWeight: 700, color: '#fff'}}>Profil</h1>
            <button 
              onClick={() => toast('Fitur coming soon!')}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '8px',
                color: '#fff'
              }}
            >
              <Settings size={22} />
            </button>
          </div>

          {/* Profile Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0,
              border: '3px solid rgba(255,255,255,0.5)',
              boxShadow: '0 8px 20px rgba(245,158,11,0.4)'
            }}>
              <User size={32} strokeWidth={2} />
            </div>
            <div style={{flex: 1, minWidth: 0}}>
              <h2 style={{fontSize: '1.1rem', fontWeight: 700, color: '#1A202C', marginBottom: '0.25rem', letterSpacing: '-0.01em'}}>
                {user.username}
              </h2>
              {user.email && (
                <p style={{fontSize: '0.85rem', color: '#64748B', marginBottom: '0.5rem'}}>
                  {user.email}
                </p>
              )}
              {reviews && reviews.total > 0 && (
                <div style={{display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.75rem', background: '#FEF3C7', borderRadius: '12px'}}>
                  <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  <span style={{fontSize: '0.875rem', fontWeight: 600, color: '#92400E'}}>
                    {reviews.average.toFixed(1)} ({reviews.total})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DBEAFE 100%)', minHeight: '60vh', paddingBottom: '80px'}}>
        {/* Stats Section */}
        <div style={{marginTop: '1rem', marginBottom: '1rem', paddingTop: '1rem'}}>
          <h3 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem'}}>
            Statistik
          </h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem'}}>
            <div style={{padding: '1.25rem 1rem', textAlign: 'center', background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)', borderRadius: '16px', boxShadow: '0 8px 20px rgba(124,58,237,0.3)'}}>
              <Target size={24} color="#fff" strokeWidth={2.5} style={{marginBottom: '0.5rem'}} />
              <div style={{fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem', letterSpacing: '-0.02em'}}>
                {user._count.services}
              </div>
              <div style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600}}>Jasa</div>
            </div>

            <div style={{padding: '1.25rem 1rem', textAlign: 'center', background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)', borderRadius: '16px', boxShadow: '0 8px 20px rgba(59,130,246,0.3)'}}>
              <ShoppingBag size={24} color="#fff" strokeWidth={2.5} style={{marginBottom: '0.5rem'}} />
              <div style={{fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem', letterSpacing: '-0.02em'}}>
                {user._count.orders}
              </div>
              <div style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600}}>Orders</div>
            </div>

            <div style={{padding: '1.25rem 1rem', textAlign: 'center', background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)', borderRadius: '16px', boxShadow: '0 8px 20px rgba(16,185,129,0.3)'}}>
              <TrendingUp size={24} color="#fff" strokeWidth={2.5} style={{marginBottom: '0.5rem'}} />
              <div style={{fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem', letterSpacing: '-0.02em'}}>
                {user._count.sales}
              </div>
              <div style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600}}>Sales</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{marginBottom: '1rem'}}>
          <h3 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem'}}>
            Menu Cepat
          </h3>
          <div className="card" style={{padding: '0.75rem'}}>
            <button 
              onClick={() => router.push('/services/new')}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '0.5rem'
              }}
              onMouseDown={(e) => e.currentTarget.style.background = '#F9FAFB'}
              onMouseUp={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Target size={18} color="#fff" strokeWidth={2} />
              </div>
              <div style={{flex: 1, textAlign: 'left'}}>
                <div style={{fontSize: '0.95rem', fontWeight: 600, color: '#1A202C'}}>Post Jasa Baru</div>
                <div style={{fontSize: '0.8rem', color: '#64748B'}}>Tawarkan keahlian Anda</div>
              </div>
            </button>

            <button 
              onClick={() => router.push('/services')}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseDown={(e) => e.currentTarget.style.background = '#F9FAFB'}
              onMouseUp={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Package size={18} color="#3B82F6" strokeWidth={2} />
              </div>
              <div style={{flex: 1, textAlign: 'left'}}>
                <div style={{fontSize: '0.95rem', fontWeight: 600, color: '#1A202C'}}>Jelajahi Jasa</div>
                <div style={{fontSize: '0.8rem', color: '#64748B'}}>Cari jasa yang Anda butuhkan</div>
              </div>
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{marginBottom: '1rem'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem'}}>
            <h3 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
              Reviews
            </h3>
            {reviews && reviews.total > 0 && (
              <span style={{fontSize: '0.8rem', color: '#7C3AED', fontWeight: 600}}>
                {reviews.total} total
              </span>
            )}
          </div>
          
          {!reviews || reviews.reviews.length === 0 ? (
            <div className="card" style={{textAlign: 'center', padding: '3rem 2rem'}}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Award size={28} color="#CBD5E1" strokeWidth={2} />
              </div>
              <p style={{color: '#64748B', fontSize: '0.9rem', fontWeight: 500}}>Belum ada review</p>
              <p style={{color: '#94A3B8', fontSize: '0.8rem', marginTop: '0.25rem'}}>Review akan muncul di sini</p>
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              {reviews.reviews.slice(0, 3).map((review: any) => (
                <div key={review.id} className="card" style={{padding: '1rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'start'}}>
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 600, fontSize: '0.9rem', color: '#1A202C', marginBottom: '0.125rem'}}>
                        {review.reviewer.username}
                      </div>
                      <div style={{fontSize: '0.75rem', color: '#64748B'}}>
                        {review.order.service.title}
                      </div>
                    </div>
                    <div style={{display: 'flex', gap: '0.125rem'}}>
                      {[1,2,3,4,5].map(r => (
                        <Star 
                          key={r}
                          size={12} 
                          fill={r <= review.rating ? '#F59E0B' : 'none'} 
                          color={r <= review.rating ? '#F59E0B' : '#E2E8F0'}
                          strokeWidth={2}
                        />
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p style={{fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', marginBottom: '0.5rem'}}>
                      {review.comment}
                    </p>
                  )}
                  <div style={{fontSize: '0.7rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                    <Calendar size={10} />
                    {new Date(review.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              ))}
              {reviews.total > 3 && (
                <button 
                  onClick={() => toast('Fitur lihat semua coming soon!')}
                  className="btn btn-secondary" 
                  style={{width: '100%'}}
                >
                  Lihat Semua ({reviews.total})
                </button>
              )}
            </div>
          )}
        </div>

        {/* Legal Links */}
        <div style={{marginBottom: '1rem'}}>
          <div className="card" style={{padding: '0.5rem'}}>
            <button 
              onClick={() => router.push('/privacy')}
              style={{
                width: '100%',
                padding: '0.875rem',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '0.25rem'
              }}
              onMouseDown={(e) => e.currentTarget.style.background = '#F9FAFB'}
              onMouseUp={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Shield size={18} color="#fff" strokeWidth={2} />
              </div>
              <div style={{flex: 1, textAlign: 'left'}}>
                <div style={{fontSize: '0.9rem', fontWeight: 600, color: '#1A202C'}}>Privacy Policy</div>
                <div style={{fontSize: '0.75rem', color: '#64748B'}}>Kebijakan privasi kami</div>
              </div>
            </button>

            <button 
              onClick={() => router.push('/terms')}
              style={{
                width: '100%',
                padding: '0.875rem',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseDown={(e) => e.currentTarget.style.background = '#F9FAFB'}
              onMouseUp={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText size={18} color="#fff" strokeWidth={2} />
              </div>
              <div style={{flex: 1, textAlign: 'left'}}>
                <div style={{fontSize: '0.9rem', fontWeight: 600, color: '#1A202C'}}>Terms of Service</div>
                <div style={{fontSize: '0.75rem', color: '#64748B'}}>Syarat dan ketentuan layanan</div>
              </div>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          style={{
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            marginBottom: '1rem',
            boxShadow: '0 8px 20px rgba(239,68,68,0.3)'
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
      <BottomNav />
    </>
  )
}
