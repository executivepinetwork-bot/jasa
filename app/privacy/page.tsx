'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react'

export default function PrivacyPage() {
  const router = useRouter()

  return (
    <div style={{background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DBEAFE 100%)', minHeight: '100vh', paddingBottom: '2rem', margin: 0, padding: 0}}>
      {/* Header */}
      <div style={{background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', paddingBottom: '1rem', paddingTop: 0}}>
        <div className="container" style={{marginTop: '0', paddingTop: '1rem'}}>
          <button 
            onClick={() => router.back()}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
              color: '#fff'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff'}}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <Shield size={24} strokeWidth={2} />
            </div>
            <div>
              <h1 style={{fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem'}}>Privacy Policy</h1>
              <p style={{fontSize: '0.8rem', opacity: 0.9}}>Terakhir diperbarui: Januari 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{marginTop: '1.5rem'}}>
        <div className="card" style={{marginBottom: '1rem', padding: '1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem'}}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Eye size={20} color="#3B82F6" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A202C'}}>1. Informasi yang Kami Kumpulkan</h2>
              <p style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6', marginBottom: '0.75rem'}}>
                Kami mengumpulkan informasi yang Anda berikan saat mendaftar, termasuk:
              </p>
              <ul style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.8', paddingLeft: '1.25rem'}}>
                <li>Informasi akun Pi Network (Pi ID, username)</li>
                <li>Data transaksi dan pesanan</li>
                <li>Informasi komunikasi dalam chat</li>
                <li>Data layanan yang Anda tawarkan</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card" style={{marginBottom: '1rem', padding: '1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem'}}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Database size={20} color="#7C3AED" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A202C'}}>2. Penggunaan Informasi</h2>
              <p style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6', marginBottom: '0.75rem'}}>
                Informasi yang kami kumpulkan digunakan untuk:
              </p>
              <ul style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.8', paddingLeft: '1.25rem'}}>
                <li>Menyediakan dan meningkatkan layanan marketplace</li>
                <li>Memproses transaksi dan pembayaran</li>
                <li>Menghubungkan pembeli dan penjual</li>
                <li>Memberikan dukungan pelanggan</li>
                <li>Mencegah penipuan dan aktivitas ilegal</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card" style={{marginBottom: '1rem', padding: '1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem'}}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Lock size={20} color="#F59E0B" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A202C'}}>3. Keamanan Data</h2>
              <p style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6'}}>
                Kami menggunakan enkripsi dan langkah keamanan standar industri untuk melindungi data Anda. Namun, tidak ada metode transmisi data melalui internet yang 100% aman. Kami berkomitmen untuk terus meningkatkan keamanan platform kami.
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{marginBottom: '1rem', padding: '1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem'}}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <UserCheck size={20} color="#10B981" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A202C'}}>4. Hak Anda</h2>
              <p style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6', marginBottom: '0.75rem'}}>
                Anda memiliki hak untuk:
              </p>
              <ul style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.8', paddingLeft: '1.25rem'}}>
                <li>Mengakses dan memperbarui informasi pribadi Anda</li>
                <li>Menghapus akun Anda kapan saja</li>
                <li>Meminta salinan data Anda</li>
                <li>Menolak penggunaan data untuk tujuan tertentu</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card" style={{padding: '1.25rem', background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)', border: '1px solid #E9D5FF'}}>
          <p style={{fontSize: '0.85rem', color: '#7C3AED', textAlign: 'center', lineHeight: '1.6'}}>
            <strong>Pertanyaan tentang privasi?</strong><br />
            Hubungi kami di <strong>privacy@pimarketplace.com</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
