'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Coins, Info, ArrowLeft, Sparkles } from 'lucide-react'

type PiAuthResponse = {
  user: { uid: string; username: string }
  accessToken: string
}

type PiSdk = {
  init: (options: { version: string; sandbox?: boolean }) => void
  authenticate: (
    scopes: string[],
    callbacks: { onIncompletePaymentFound: () => void }
  ) => Promise<PiAuthResponse>
}

declare global {
  interface Window {
    Pi?: PiSdk
    __piMarketplaceInitialized?: boolean
  }
}

function shouldUseSandbox() {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname.toLowerCase()
  return host.includes('testnet') || host.includes('localhost')
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)
  const [piDetected, setPiDetected] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let cancelled = false
    let attempts = 0

    const detectAndInitSdk = () => {
      if (cancelled) return

      const pi = window.Pi
      if (pi?.authenticate) {
        setPiDetected(true)

        try {
          if (!window.__piMarketplaceInitialized) {
            pi.init({ version: '2.0', sandbox: shouldUseSandbox() })
            window.__piMarketplaceInitialized = true
          }
          setSdkReady(true)
          return
        } catch (error) {
          console.error('Failed to initialize Pi SDK:', error)
        }
      }

      if (attempts < 40) {
        attempts += 1
        window.setTimeout(detectAndInitSdk, 250)
      }
    }

    detectAndInitSdk()

    return () => {
      cancelled = true
    }
  }, [])

  const handlePiLogin = async () => {
    if (!window.Pi?.authenticate) {
      toast.error('Pi SDK is not available yet. Please open this page in Pi Browser and try again.')
      return
    }

    try {
      if (!window.__piMarketplaceInitialized) {
        window.Pi.init({ version: '2.0', sandbox: shouldUseSandbox() })
        window.__piMarketplaceInitialized = true
      }
    } catch (error) {
      console.error('Pi SDK init error:', error)
      toast.error('Pi SDK could not be initialized. Please refresh the page and try again.')
      return
    }

    setLoading(true)
    const loadingToast = toast.loading('Signing in with Pi Network...')

    try {
      const auth = await window.Pi.authenticate(['username', 'payments'], {
        onIncompletePaymentFound: () => {},
      })

      const res = await fetch('/api/auth/pi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          piUid: auth.user.uid,
          piUsername: auth.user.username,
          accessToken: auth.accessToken,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Pi login failed')
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      toast.success('Signed in successfully.', { id: loadingToast })
      setTimeout(() => router.push('/services'), 300)
    } catch (error: any) {
      toast.error(error?.message || 'Unable to sign in with Pi Network.', { id: loadingToast })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,0.04)',
        }}
      />

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
          backdropFilter: 'blur(10px)',
        }}
      >
        <ArrowLeft size={20} />
      </button>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '2rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <div
            style={{
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
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Sparkles size={40} color="#fff" strokeWidth={2} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Welcome
            </h1>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: '1.5',
              }}
            >
              Sign in with your Pi Network account to access the marketplace.
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={handlePiLogin}
              disabled={loading || !sdkReady}
              style={{
                width: '100%',
                padding: '1rem',
                background: loading || !sdkReady ? '#94A3B8' : 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: loading || !sdkReady ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: loading || !sdkReady ? 'none' : '0 4px 12px rgba(124,58,237,0.3)',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              <Coins size={22} strokeWidth={2} />
              {loading ? 'Signing in...' : 'Sign in with Pi Network'}
            </button>

            <div
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#EFF6FF',
                borderRadius: '10px',
                border: '1px solid #BFDBFE',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <Info size={18} style={{ color: '#1D4ED8', flexShrink: 0, marginTop: '0.1rem' }} />
                <div>
                  <strong
                    style={{ display: 'block', color: '#1E3A8A', fontSize: '0.875rem', marginBottom: '0.25rem' }}
                  >
                    Pi Network login only
                  </strong>
                  <p style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#1E40AF', margin: 0 }}>
                    Demo login has been removed. Open this page in Pi Browser so the Pi SDK can authenticate your account.
                  </p>
                  {!piDetected && (
                    <p style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#1E40AF', margin: '0.5rem 0 0' }}>
                      Pi SDK has not been detected yet on this device.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}