'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, Package, User } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

  useEffect(() => {
    const updateInset = () => {
      const viewport = window.visualViewport
      const viewportInset = viewport
        ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
        : 0
      const ua = navigator.userAgent || ''
      const piBrowserFallback = /PiBrowser|Pi Network|\bwv\b/i.test(ua) ? 20 : 0
      const inset = Math.max(viewportInset, piBrowserFallback)
      document.documentElement.style.setProperty('--pi-bottom-inset', `${inset}px`)
    }

    updateInset()
    window.addEventListener('resize', updateInset)
    window.visualViewport?.addEventListener('resize', updateInset)
    window.visualViewport?.addEventListener('scroll', updateInset)

    return () => {
      window.removeEventListener('resize', updateInset)
      window.visualViewport?.removeEventListener('resize', updateInset)
      window.visualViewport?.removeEventListener('scroll', updateInset)
    }
  }, [])

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <div className="bottom-nav">
      <Link href="/" className={`bottom-nav-item ${isActive('/') && pathname === '/' ? 'active' : ''}`}>
        <div className="bottom-nav-icon">
          <Home size={24} strokeWidth={2} />
        </div>
        <div>Home</div>
      </Link>
      <Link href="/services" className={`bottom-nav-item ${isActive('/services') ? 'active' : ''}`}>
        <div className="bottom-nav-icon">
          <ShoppingBag size={24} strokeWidth={2} />
        </div>
        <div>Store</div>
      </Link>
      <Link href="/orders" className={`bottom-nav-item ${isActive('/orders') ? 'active' : ''}`}>
        <div className="bottom-nav-icon">
          <Package size={24} strokeWidth={2} />
        </div>
        <div>Orders</div>
      </Link>
      <Link href="/profile" className={`bottom-nav-item ${isActive('/profile') ? 'active' : ''}`}>
        <div className="bottom-nav-icon">
          <User size={24} strokeWidth={2} />
        </div>
        <div>Account</div>
      </Link>
    </div>
  )
}