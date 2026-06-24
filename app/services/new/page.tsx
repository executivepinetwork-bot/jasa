'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import BottomNav from '@/components/BottomNav'
import { Rocket, AlertCircle, Upload, X, Palette, Code, PenTool, Megaphone, Video, Package } from 'lucide-react'

export default function NewServicePage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'design',
    deliveryDays: '3',
    image: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 2MB')
        return
      }
      
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setForm({...form, image: reader.result as string})
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview('')
    setForm({...form, image: ''})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const loadingToast = toast.loading('Memposting jasa...')

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Silakan login terlebih dahulu', { id: loadingToast })
        router.push('/login')
        return
      }

      const res = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          deliveryDays: parseInt(form.deliveryDays)
        })
      })

      const data = await res.json()

      if (data.service) {
        toast.success('Jasa berhasil diposting!', { id: loadingToast })
        setTimeout(() => router.push('/services'), 500)
      } else {
        toast.error(data.error || 'Gagal memposting jasa', { id: loadingToast })
      }
    } catch (error) {
      toast.error('Terjadi kesalahan', { id: loadingToast })
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { value: 'design', label: 'Design & Creative', icon: Palette },
    { value: 'programming', label: 'Programming & Tech', icon: Code },
    { value: 'writing', label: 'Writing & Translation', icon: PenTool },
    { value: 'marketing', label: 'Digital Marketing', icon: Megaphone },
    { value: 'video', label: 'Video & Animation', icon: Video },
    { value: 'other', label: 'Lainnya', icon: Package }
  ]

  return (
    <>
      <Navbar />
      <div className="container" style={{marginTop: '80px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto'}}>
        <div style={{marginBottom: '2rem'}}>
          <h1 style={{fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A202C', letterSpacing: '-0.02em'}}>
            Post Jasa Baru
          </h1>
          <p style={{fontSize: '0.9rem', color: '#64748B'}}>
            Tawarkan keahlian Anda dan mulai dapatkan penghasilan
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card">
            {/* Image Upload */}
            <div style={{marginBottom: '1.5rem'}}>
              <label className="label">Portfolio Gambar *</label>
              
              {!imagePreview ? (
                <label style={{
                  display: 'block',
                  padding: '2rem',
                  border: '2px dashed #E2E8F0',
                  borderRadius: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: '#F9FAFB'
                }}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    style={{display: 'none'}}
                  />
                  <Upload size={40} style={{margin: '0 auto 1rem', color: '#7C3AED'}} />
                  <div style={{fontSize: '0.95rem', fontWeight: 600, color: '#1A202C', marginBottom: '0.25rem'}}>
                    Upload Gambar Portfolio
                  </div>
                  <div style={{fontSize: '0.8rem', color: '#64748B'}}>
                    PNG, JPG hingga 2MB
                  </div>
                </label>
              ) : (
                <div style={{position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0'}}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{width: '100%', height: '240px', objectFit: 'cover'}}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      background: 'rgba(0,0,0,0.6)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#fff',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

            <div style={{marginBottom: '1.5rem'}}>
              <label className="label">Judul Jasa *</label>
              <input
                type="text"
                className="input"
                placeholder="Contoh: Desain Logo Modern & Profesional"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                required
              />
              <p style={{fontSize: '0.8rem', color: '#64748B', marginTop: '0.375rem'}}>
                Buat judul yang menarik dan jelas
              </p>
            </div>

            <div style={{marginBottom: '1.5rem'}}>
              <label className="label">Deskripsi Lengkap *</label>
              <textarea
                className="textarea"
                placeholder="Jelaskan secara detail apa yang akan Anda kerjakan, termasuk deliverables dan revision..."
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                required
                style={{minHeight: '150px'}}
              />
              <p style={{fontSize: '0.8rem', color: '#64748B', marginTop: '0.375rem'}}>
                Deskripsi yang detail meningkatkan kepercayaan buyer
              </p>
            </div>

            <div style={{marginBottom: '1.5rem'}}>
              <label className="label">Kategori *</label>
              <select
                className="input"
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
                style={{paddingRight: '2.5rem'}}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem'}}>
              <div>
                <label className="label">Harga (π) *</label>
                <input
                  type="number"
                  className="input"
                  placeholder="50"
                  step="0.01"
                  min="0.01"
                  value={form.price}
                  onChange={(e) => setForm({...form, price: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="label">Waktu Pengerjaan *</label>
                <input
                  type="number"
                  className="input"
                  placeholder="3"
                  min="1"
                  value={form.deliveryDays}
                  onChange={(e) => setForm({...form, deliveryDays: e.target.value})}
                  required
                />
                <p style={{fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem'}}>
                  Dalam hari
                </p>
              </div>
            </div>

            <div className="info-box info" style={{marginBottom: '1.5rem'}}>
              <div style={{display: 'flex', alignItems: 'start', gap: '0.75rem'}}>
                <AlertCircle size={18} style={{flexShrink: 0, marginTop: '0.1rem'}} />
                <div style={{fontSize: '0.85rem', lineHeight: '1.6'}}>
                  <strong style={{display: 'block', marginBottom: '0.25rem'}}>Tips Sukses:</strong>
                  <ul style={{paddingLeft: '1.25rem', margin: 0}}>
                    <li>Upload gambar portfolio terbaik Anda</li>
                    <li>Pastikan deskripsi jelas dan detail</li>
                    <li>Set harga yang kompetitif</li>
                    <li>Berikan waktu pengerjaan yang realistis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{width: '100%', fontSize: '1.05rem', padding: '1rem'}}
            disabled={loading}
          >
            <Rocket size={20} strokeWidth={2} />
            {loading ? 'Memposting...' : 'Posting Jasa Sekarang'}
          </button>
        </form>
      </div>
      <BottomNav />
    </>
  )
}
