'use client'

import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import { DUMMY_PRODUCTS } from '@/lib/dummy-store'
import { Shield, Coins, ShoppingBag, Truck, ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  const featuredProducts = DUMMY_PRODUCTS.slice(0, 3)

  return (
    <>
      <div className="hero" style={{ marginTop: 0 }}>
        <div style={{ position: 'relative' }}>
          <Sparkles size={48} style={{ margin: '0 auto 1rem', opacity: 0.9 }} />
          <h1>Pi Online Store</h1>
          <p>Produk dummy siap checkout di Pi Browser dengan harga maksimal 3 Pi.</p>
          <Link href="/services" className="btn btn-primary" style={{ background: '#fff', color: '#7C3AED', fontSize: '1rem', marginTop: '0.5rem' }}>
            Shop Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '0.5rem' }}>
          <div className="feature-card">
            <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#fff' }}>
              <Coins size={28} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1A202C' }}>Pi Checkout Ready</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5' }}>Semua produk demo dijaga tetap di bawah 3 Pi untuk test cepat.</p>
          </div>

          <div className="feature-card">
            <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#fff' }}>
              <Shield size={28} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1A202C' }}>Fast Test Flow</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5' }}>Login, buka produk, buat order, lalu lanjutkan ke alur transaksi Pi.</p>
          </div>

          <div className="feature-card">
            <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#fff' }}>
              <ShoppingBag size={28} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1A202C' }}>Dummy Catalog</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5' }}>Store akan langsung tampil meski database produk masih kosong.</p>
          </div>

          <div className="feature-card">
            <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#fff' }}>
              <Truck size={28} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1A202C' }}>Pi Browser Friendly</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5' }}>Bottom navigation disiapkan supaya tidak ketiban navigation bar Android.</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1A202C', letterSpacing: '-0.02em' }}>
              Featured Test Products
            </h2>
            <Link href="/services" style={{ color: '#7C3AED', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
              View all
            </Link>
          </div>

          <div className="grid" style={{ gap: '0.875rem' }}>
            {featuredProducts.map((product) => (
              <div key={product.title} className="card" style={{ padding: '1rem 1rem 1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1A202C', marginBottom: '0.35rem' }}>{product.title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5' }}>{product.description}</div>
                  </div>
                  <div style={{ whiteSpace: 'nowrap', fontSize: '1.1rem', fontWeight: 700, color: '#7C3AED' }}>Pi {product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  )
}