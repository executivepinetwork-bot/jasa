'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import BottomNav from '@/components/BottomNav'
import { Plus, Search, Palette, Code, PenTool, Megaphone, Package, Clock, User, Star, TrendingUp } from 'lucide-react'

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    fetchServices()
  }, [category])

  const fetchServices = async () => {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (search) params.append('search', search)

    const res = await fetch(`/api/services?${params}`)
    const data = await res.json()
    setServices(data.services)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchServices()
  }

  const handlePostClick = () => {
    router.push('/services/new')
  }

  const getCategoryIcon = (cat: string) => {
    const iconProps = { size: 40, strokeWidth: 1.5 }
    switch(cat) {
      case 'design': return <Palette {...iconProps} />
      case 'programming': return <Code {...iconProps} />
      case 'writing': return <PenTool {...iconProps} />
      case 'marketing': return <Megaphone {...iconProps} />
      default: return <Package {...iconProps} />
    }
  }

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'design': return { bg: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)', text: '#fff' }
      case 'programming': return { bg: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', text: '#fff' }
      case 'writing': return { bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', text: '#fff' }
      case 'marketing': return { bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', text: '#fff' }
      default: return { bg: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', text: '#fff' }
    }
  }

  const categories = [
    { id: '', label: 'Semua', icon: Package },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'programming', label: 'Code', icon: Code },
    { id: 'writing', label: 'Writing', icon: PenTool },
    { id: 'marketing', label: 'Marketing', icon: Megaphone }
  ]

  return (
    <>
      <div style={{background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DBEAFE 100%)', minHeight: '100vh', paddingBottom: '80px'}}>
        {/* Header */}
        <div style={{background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', paddingTop: '1rem', paddingBottom: '1rem'}}>
          <div className="container" style={{marginTop: 0, paddingTop: 0, paddingBottom: 0}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', color: '#fff'}}>
              <h1 style={{fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em'}}>
                Jelajahi Jasa
              </h1>
              {isLoggedIn && (
                <button 
                  onClick={handlePostClick} 
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    padding: '0.5rem 0.875rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem'
                  }}
                >
                  <Plus size={16} strokeWidth={2.5} />
                  Post
                </button>
              )}
            </div>

            {/* Search Bar */}
            <div style={{position: 'relative'}}>
              <Search size={18} style={{position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', zIndex: 1}} />
              <input
                type="text"
                placeholder="Cari jasa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.875rem 0.75rem 2.75rem',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
          </div>
        </div>

        <div className="container" style={{marginTop: '1rem'}}>
          {/* Categories */}
          <div style={{marginBottom: '1rem'}}>
            <div style={{display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem'}}>
              {categories.map(cat => {
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
                      transition: 'all 0.2s'
                    }}
                  >
                    <Icon size={16} strokeWidth={2} />
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>

          {services.length === 0 ? (
            <div className="card" style={{textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)'}}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: '#7C3AED'
              }}>
                <Package size={36} strokeWidth={2} />
              </div>
              <h3 style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1A202C'}}>
                Belum Ada Jasa
              </h3>
              <p style={{color: '#64748B', marginBottom: '1.5rem', fontSize: '0.9rem'}}>
                {isLoggedIn ? 'Jadilah yang pertama memposting jasa' : 'Login untuk memposting jasa'}
              </p>
              {isLoggedIn ? (
                <button onClick={handlePostClick} className="btn btn-primary">
                  <Plus size={18} />
                  Post Jasa Pertama
                </button>
              ) : (
                <button onClick={() => router.push('/login')} className="btn btn-primary">
                  Login untuk Post Jasa
                </button>
              )}
            </div>
          ) : (
            <div className="grid" style={{gap: '1rem'}}>
              {services.map((service: any) => (
                <Link href={`/services/${service.id}`} key={service.id} style={{textDecoration: 'none', color: 'inherit'}}>
                  <div style={{
                    background: '#fff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s',
                    border: '1px solid rgba(226,232,240,0.5)'
                  }}>
                    {/* Image Section */}
                    <div style={{position: 'relative'}}>
                      {service.image ? (
                        <img src={service.image} alt={service.title} style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '180px',
                          background: getCategoryColor(service.category).bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff'
                        }}>
                          {getCategoryIcon(service.category)}
                        </div>
                      )}
                      <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        background: getCategoryColor(service.category).bg,
                        color: getCategoryColor(service.category).text,
                        padding: '0.375rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}>
                        {service.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{padding: '1.25rem'}}>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                        color: '#1A202C',
                        lineHeight: '1.4',
                        letterSpacing: '-0.01em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {service.title}
                      </h3>

                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem'}}>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: '#7C3AED',
                          letterSpacing: '-0.02em'
                        }}>
                          π {service.price}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          fontSize: '0.8rem',
                          color: '#64748B',
                          background: '#F1F5F9',
                          padding: '0.375rem 0.75rem',
                          borderRadius: '8px',
                          fontWeight: 600
                        }}>
                          <Clock size={14} strokeWidth={2} />
                          {service.deliveryDays}d
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid #F1F5F9'
                      }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff'
                          }}>
                            <User size={16} strokeWidth={2} />
                          </div>
                          <span style={{fontSize: '0.85rem', fontWeight: 600, color: '#475569'}}>
                            {service.user.username}
                          </span>
                        </div>
                        {service._count?.reviews > 0 && (
                          <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                            <Star size={14} fill="#F59E0B" color="#F59E0B" />
                            <span style={{fontSize: '0.85rem', fontWeight: 600, color: '#1A202C'}}>5.0</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  )
}
