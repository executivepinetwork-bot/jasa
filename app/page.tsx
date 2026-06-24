'use client'

import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import { Shield, Coins, MessageCircle, Star, Palette, Code, PenTool, Megaphone, ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <>
      <div className="hero" style={{marginTop: 0}}>
        <div style={{position: 'relative'}}>
          <Sparkles size={48} style={{margin: '0 auto 1rem', opacity: 0.9}} />
          <h1>Pi Marketplace</h1>
          <p>Platform jasa digital profesional dengan sistem escrow aman</p>
          <Link href="/services" className="btn btn-primary" style={{background: '#fff', color: '#7C3AED', fontSize: '1rem', marginTop: '0.5rem'}}>
            Mulai Sekarang
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="container">
        <h2 style={{fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center', color: '#1A202C', letterSpacing: '-0.02em'}}>
          Kenapa Memilih Kami?
        </h2>
        
        <div className="grid" style={{gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem'}}>
          <div className="feature-card">
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: '#fff'
            }}>
              <Shield size={28} />
            </div>
            <h3 style={{fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1A202C'}}>Escrow Aman</h3>
            <p style={{fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5'}}>Dana ditahan hingga pekerjaan selesai</p>
          </div>

          <div className="feature-card">
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: '#fff'
            }}>
              <Coins size={28} />
            </div>
            <h3 style={{fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1A202C'}}>Bayar Pi</h3>
            <p style={{fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5'}}>Transaksi menggunakan Pi Network</p>
          </div>

          <div className="feature-card">
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: '#fff'
            }}>
              <MessageCircle size={28} />
            </div>
            <h3 style={{fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1A202C'}}>Chat Real-time</h3>
            <p style={{fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5'}}>Komunikasi langsung dengan seller</p>
          </div>

          <div className="feature-card">
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: '#fff'
            }}>
              <Star size={28} />
            </div>
            <h3 style={{fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1A202C'}}>Review System</h3>
            <p style={{fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5'}}>Rating transparan untuk kepercayaan</p>
          </div>
        </div>

        <div style={{marginTop: '3rem'}}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#1A202C', letterSpacing: '-0.02em'}}>
            Kategori Populer
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem'}}>
            <Link href="/services?category=design" className="btn btn-secondary" style={{justifyContent: 'flex-start'}}>
              <Palette size={18} />
              Design
            </Link>
            <Link href="/services?category=programming" className="btn btn-secondary" style={{justifyContent: 'flex-start'}}>
              <Code size={18} />
              Programming
            </Link>
            <Link href="/services?category=writing" className="btn btn-secondary" style={{justifyContent: 'flex-start'}}>
              <PenTool size={18} />
              Writing
            </Link>
            <Link href="/services?category=marketing" className="btn btn-secondary" style={{justifyContent: 'flex-start'}}>
              <Megaphone size={18} />
              Marketing
            </Link>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  )
}
