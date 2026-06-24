'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Coins, Info, ArrowLeft, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleMockLogin = async () => {
    setLoading(true)
    const loadingToast = toast.loading('Membuat akun demo...')
    
    try {
      const mockUser = {
        piId: `pi-${Date.now()}`,
        username: `user${Math.floor(Math.random() * 1000)}`,
        email: `user${Math.floor(Math.random() * 1000)}@example.com`,
        avatar: null
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockUser)
      })

      const data = await res.json()
      
      if (data.token) {
        localStorage.setItem('token', data.token)
        toast.success('Login berhasil!', { id: loadingToast })
        setTimeout(() => router.push('/services'), 500)
      } else {
        toast.error('Login gagal', { id: loadingToast })
      }
    } catch (error) {
      toast.error('Terjadi kesalahan', { id: loadingToast })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', position: 'relative', overflow: 'hidden'}}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.3
      }}></div>

      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 10,
          backdropFilter: 'blur(10px)'
        }}
      >
        <ArrowLeft size={20} />
      </button>

      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        <div style={{maxWidth: '400px', width: '100%', margin: '0 auto'}}>
          {/* Logo/Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Sparkles size={40} color="#fff" strokeWidth={2} />
          </div>

          {/* Title */}
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}>
              Selamat Datang
            </h1>
            <p style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: '1.5'
            }}>
              Login untuk mengakses marketplace jasa digital dengan Pi Network
            </p>
          </div>

          {/* Login Card */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            marginBottom: '1.5rem'
          }}>
            <button 
              onClick={handleMockLogin}
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                background: loading ? '#94A3B8' : 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(124,58,237,0.3)',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
            >
              <Coins size={22} strokeWidth={2} />
              {loading ? 'Loading...' : 'Login dengan Pi Network'}
            </button>

            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#FEF3C7',
              borderRadius: '10px',
              border: '1px solid #FDE68A'
            }}>
              <div style={{display: 'flex', alignItems: 'start', gap: '0.75rem'}}>
                <Info size={18} style={{color: '#92400E', flexShrink: 0, marginTop: '0.1rem'}} />
                <div>
                  <strong style={{display: 'block', color: '#92400E', fontSize: '0.875rem', marginBottom: '0.25rem'}}>
                    Mode Demo
                  </strong>
                  <p style={{fontSize: '0.8rem', lineHeight: '1.5', color: '#78350F', margin: 0}}>
                    Saat ini menggunakan mock login untuk development. Auto-generate user baru untuk testing fitur.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff'}}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <div>
                  <div style={{fontSize: '0.9rem', fontWeight: 600}}>Escrow Aman</div>
                  <div style={{fontSize: '0.8rem', opacity: 0.85}}>Dana dilindungi hingga selesai</div>
                </div>
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff'}}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <div>
                  <div style={{fontSize: '0.9rem', fontWeight: 600}}>Bayar dengan Pi</div>
                  <div style={{fontSize: '0.8rem', opacity: 0.85}}>Transaksi mudah dengan Pi Network</div>
                </div>
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff'}}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <div>
                  <div style={{fontSize: '0.9rem', fontWeight: 600}}>Review Transparan</div>
                  <div style={{fontSize: '0.8rem', opacity: 0.85}}>Rating dan review untuk kepercayaan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
