'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, LogIn, Sparkles } from 'lucide-react'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.json())
        .then(data => {
          if (data.user) setUser(data.user)
        })
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/')
  }

  return (
    <nav className="nav">
      <div className="nav-content">
        <Link href="/" className="nav-brand">
          <Sparkles size={20} />
          Pi Market
        </Link>
        <div className="nav-links">
          {user ? (
            <button onClick={logout} className="btn btn-small" style={{background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none'}}>
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link href="/login" className="btn btn-small" style={{background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none'}}>
              <LogIn size={16} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
