'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, FileText, CheckCircle, XCircle, AlertTriangle, Scale } from 'lucide-react'

export default function TermsPage() {
  const router = useRouter()

  return (
    <div style={{background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DBEAFE 100%)', minHeight: '100vh', paddingBottom: '2rem', margin: 0, padding: 0}}>
      {/* Header */}
      <div style={{background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', paddingBottom: '1rem', paddingTop: 0}}>
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
              <FileText size={24} strokeWidth={2} />
            </div>
            <div>
              <h1 style={{fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem'}}>Terms of Service</h1>
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
              background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <CheckCircle size={20} color="#10B981" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A202C'}}>1. Penerimaan Ketentuan</h2>
              <p style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6'}}>
                Dengan mengakses dan menggunakan Pi Marketplace, Anda setuju untuk terikat dengan syarat dan ketentuan ini. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan layanan kami.
              </p>
            </div>
          </div>
        </div>

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
              <Scale size={20} color="#3B82F6" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A202C'}}>2. Tanggung Jawab Pengguna</h2>
              <p style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6', marginBottom: '0.75rem'}}>
                Sebagai pengguna, Anda bertanggung jawab untuk:
              </p>
              <ul style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.8', paddingLeft: '1.25rem'}}>
                <li>Memberikan informasi yang akurat dan terkini</li>
                <li>Menjaga keamanan akun Anda</li>
                <li>Mematuhi semua hukum dan peraturan yang berlaku</li>
                <li>Tidak melakukan aktivitas penipuan atau ilegal</li>
                <li>Menghormati hak pengguna lain</li>
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
              <CheckCircle size={20} color="#7C3AED" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A202C'}}>3. Layanan Escrow</h2>
              <p style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6'}}>
                Semua transaksi dilindungi oleh sistem escrow. Pembayaran akan ditahan hingga pembeli mengonfirmasi penerimaan layanan. Jika terjadi sengketa, platform akan memediasi berdasarkan bukti yang diberikan kedua belah pihak.
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{marginBottom: '1rem', padding: '1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem'}}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <XCircle size={20} color="#EF4444" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A202C'}}>4. Konten yang Dilarang</h2>
              <p style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6', marginBottom: '0.75rem'}}>
                Dilarang keras memposting atau menawarkan:
              </p>
              <ul style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.8', paddingLeft: '1.25rem'}}>
                <li>Layanan ilegal atau melanggar hukum</li>
                <li>Konten yang melanggar hak cipta atau kekayaan intelektual</li>
                <li>Layanan yang menyesatkan atau penipuan</li>
                <li>Konten yang bersifat diskriminatif atau ofensif</li>
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
              <AlertTriangle size={20} color="#F59E0B" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A202C'}}>5. Pembatasan Tanggung Jawab</h2>
              <p style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6'}}>
                Pi Marketplace bertindak sebagai platform penghubung antara pembeli dan penjual. Kami tidak bertanggung jawab atas kualitas, keamanan, atau legalitas layanan yang ditawarkan oleh pengguna. Transaksi dilakukan antara pengguna dengan risiko mereka sendiri.
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{marginBottom: '1rem', padding: '1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem'}}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135d, #DBEAFE 0%, #BFDBFE 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <FileText size={20} color="#3B82F6" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A202C'}}>6. Perubahan Ketentuan</h2>
              <p style={{fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6'}}>
                Kami berhak untuk mengubah ketentuan layanan ini kapan saja. Perubahan akan diumumkan melalui platform dan mulai berlaku setelah dipublikasikan. Penggunaan berkelanjutan setelah perubahan dianggap sebagai penerimaan ketentuan baru.
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{padding: '1.25rem', background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', border: '1px solid #FCD34D'}}>
          <p style={{fontSize: '0.85rem', color: '#92400E', textAlign: 'center', lineHeight: '1.6'}}>
            <strong>Pertanyaan tentang ketentuan layanan?</strong><br />
            Hubungi kami di <strong>legal@pimarketplace.com</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
