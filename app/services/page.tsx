'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import { Search, Package, Clock, User, ShoppingBag, Gift, Briefcase, Box } from 'lucide-react'

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [category])

  const fetchProducts = async () => {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (search) params.append('search', search)

    const res = await fetch(`/api/services?${params}`)
    const data = await res.json()
    setServices(Array.isArray(data.services) ? data.services : [])
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProducts()
  }

  const getCategoryIcon = (cat: string) => {
    const iconProps = { size: 40, strokeWidth: 1.5 }
    switch (cat) {
      case 'merchandise':
        return <ShoppingBag {...iconProps} />
      case 'office':
        return <Briefcase {...iconProps} />
      case 'gift':
        return <Gift {...iconProps} />
      default:
        return <Box {...iconProps} />
    }
  }

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'merchandise':
        return { bg: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', text: '#fff' }
      case 'office':
        return { bg: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', text: '#fff' }
      case 'gift':
        return { bg: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', text: '#fff' }
      default:
        return { bg: 'linear-gradient(135deg, #0F766E 0%, #0D9488 100%)', text: '#fff' }
    }
  }

  const categories = [
    { id: '', label: 'All', icon: Package },
    { id: 'merchandise', label: 'Merchandise', icon: ShoppingBag },
    { id: 'office', label: 'Office', icon: Briefcase },
    { id: 'gift', label: 'Gift', icon: Gift },
  ]

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DBEAFE 100%)', minHeight: '100vh', paddingBottom: 'calc(96px + var(--pi-bottom-inset, 0px))' }}>
        <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', paddingTop: '1rem', paddingBottom: '1rem' }}>
          <div className="container" style={{ marginTop: 0, paddingTop: 0, paddingBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', color: '#fff' }}>
              <div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Pi Store</h1>
                <p style={{ fontSize: '0.85rem', opacity: 0.88, marginTop: '0.2rem' }}>Dummy products under 3 Pi for direct transaction testing.</p>
              </div>
            </div>

            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', zIndex: 1 }} />
              <input
                type="text"
                placeholder="Search Pi products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 0.875rem 0.75rem 2.75rem', border: 'none', borderRadius: '10px', fontSize: '0.9rem', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}
              />
            </form>
          </div>
        </div>

        <div className="container" style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {categories.map((cat) => {
                const Icon = cat.icon
                const isActive = category === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' : '#fff',
                      color: isActive ? '#fff' : '#64748B',
                      border: isActive ? 'none' : '1.5px solid #E2E8F0',
                      padding: '0.625rem 1rem',
                      borderRadius: '10px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      whiteSpace: 'nowrap',
                      minWidth: 'fit-content',
                      boxShadow: isActive ? '0 4px 12px rgba(124,58,237,0.3)' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={16} strokeWidth={2} />
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid" style={{ gap: '1rem' }}>
            {services.map((service) => (
              <Link href={`/services/${service.id}`} key={service.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transition: 'all 0.2s', border: '1px solid rgba(226,232,240,0.5)' }}>
                  <div style={{ position: 'relative' }}>
                    {service.image ? (
                      <img src={service.image} alt={service.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '180px', background: getCategoryColor(service.category).bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        {getCategoryIcon(service.category)}
                      </div>
                    )}
                    <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: getCategoryColor(service.category).bg, color: getCategoryColor(service.category).text, padding: '0.375rem 0.75rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                      {service.category}
                    </div>
                  </div>

                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1A202C', lineHeight: '1.4', letterSpacing: '-0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {service.title}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#7C3AED', letterSpacing: '-0.02em' }}>
                        Pi {service.price}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', color: '#64748B', background: '#F1F5F9', padding: '0.375rem 0.75rem', borderRadius: '8px', fontWeight: 600 }}>
                        <Clock size={14} strokeWidth={2} />
                        {service.deliveryDays}d
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                          <User size={16} strokeWidth={2} />
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>{service.user.username}</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#7C3AED' }}>View product</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  )
}