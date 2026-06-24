'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Target, Package, User } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

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
          <Target size={24} strokeWidth={2} />
        </div>
        <div>Jasa</div>
      </Link>
      <Link href="/orders" className={`bottom-nav-item ${isActive('/orders') ? 'active' : ''}`}>
        <div className="bottom-nav-icon">
          <Package size={24} strokeWidth={2} />
        </div>
        <div>Pesanan</div>
      </Link>
      <Link href="/profile" className={`bottom-nav-item ${isActive('/profile') ? 'active' : ''}`}>
        <div className="bottom-nav-icon">
          <User size={24} strokeWidth={2} />
        </div>
        <div>Profil</div>
      </Link>
    </div>
  )
}
