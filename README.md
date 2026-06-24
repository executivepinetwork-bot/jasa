# Pi Marketplace - Jasa Digital

Marketplace jasa digital dengan escrow dan pembayaran Pi Network.

## 🚀 Stack

- Next.js 15 App Router + TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication
- Socket.io (chat real-time)
- Pi Network SDK

## 📦 Fitur

### ✅ Backend + Frontend Complete

1. **Auth & User**
   - Login Pi Network (auto-create/update user)
   - Mock login untuk development
   - User profile dengan stats dan reviews

2. **Service Management**
   - List services (filter category, search)
   - Create service (seller)
   - Service detail dengan order button
   - Category: Design, Programming, Writing, Marketing, Video

3. **Order & Escrow**
   - Create order dari service detail
   - Payment dengan Pi Network (mock untuk dev)
   - Update status order (seller)
   - Order detail dengan chat history
   - Status: pending → paid → completed

4. **Chat**
   - Chat per order antara buyer-seller
   - Real-time messaging (ready untuk Socket.io)

5. **Review & Rating**
   - Buyer review seller setelah order completed
   - List reviews di profile
   - Average rating display

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

Copy `.env.example` ke `.env`:

```bash
copy .env.example .env
```

Isi variabel:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/pi_marketplace"
JWT_SECRET="your-secret-key-change-in-production"
PI_API_KEY="your-pi-api-key"
NEXT_PUBLIC_PI_APP_ID="your-pi-app-id"
```

**Note:** Untuk development, bisa pakai dummy value untuk Pi credentials.

### 3. Setup Database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Jalankan Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 🎨 UI Pages

### Public
- **/** - Homepage dengan hero dan kategori
- **/services** - List semua jasa dengan filter & search
- **/services/[id]** - Detail jasa dengan order button

### Protected (Login Required)
- **/login** - Login dengan Pi Network (mock untuk dev)
- **/services/new** - Post jasa baru
- **/orders** - List orders (buyer/seller view)
- **/orders/[id]** - Detail order dengan chat & payment
- **/profile** - User profile dengan reviews

## 📡 API Routes

### Auth

```
POST /api/auth/login
Body: { piId, username, email?, avatar? }
Response: { token, user }

GET /api/auth/me
Headers: Authorization: Bearer <token>
Response: { user }
```

### Services

```
GET /api/services?category=design&search=logo
Response: { services }

POST /api/services
Headers: Authorization: Bearer <token>
Body: { title, description, price, category, deliveryDays, image? }
Response: { service }

GET /api/services/[id]
Response: { service }

PATCH /api/services/[id]
Headers: Authorization: Bearer <token>
Body: { title?, description?, price?, ... }
Response: { service }

DELETE /api/services/[id]
Headers: Authorization: Bearer <token>
Response: { success: true }
```

### Orders

```
GET /api/orders?type=buyer
Headers: Authorization: Bearer <token>
Response: { orders }

POST /api/orders
Headers: Authorization: Bearer <token>
Body: { serviceId }
Response: { order }

GET /api/orders/[id]
Headers: Authorization: Bearer <token>
Response: { order }

PATCH /api/orders/[id]
Headers: Authorization: Bearer <token>
Body: { status: "completed" }
Response: { order }

POST /api/orders/payment
Headers: Authorization: Bearer <token>
Body: { orderId, piTxId }
Response: { order }
```

### Chat

```
POST /api/chat
Headers: Authorization: Bearer <token>
Body: { orderId, receiverId, message }
Response: { chat }
```

### Reviews

```
GET /api/reviews?userId=xxx
Response: { reviews, average, total }

POST /api/reviews
Headers: Authorization: Bearer <token>
Body: { orderId, rating, comment? }
Response: { review }
```

## 🗄️ Database Schema

```prisma
User {
  id, piId, username, email, avatar, bio
  services[], orders[], sales[], chats[], reviews[]
}

Service {
  id, title, description, price, category, deliveryDays, image
  userId, orders[]
}

Order {
  id, status, amount, piTxId, createdAt, completedAt
  buyerId, sellerId, serviceId
  chats[], review?
}

Chat {
  id, message, createdAt
  senderId, receiverId, orderId?
}

Review {
  id, rating, comment, createdAt
  orderId, reviewerId, reviewedId
}
```

## 🔐 Order Flow

1. **Buyer** browse services → pilih service → order
2. **Status: pending** → Buyer harus bayar
3. **Buyer** bayar dengan Pi → **Status: paid** (escrow aktif)
4. **Seller** kerjakan jasa → komunikasi via chat
5. **Seller** complete order → **Status: completed** (Pi released)
6. **Buyer** kasih review & rating

## 🎯 User Journey

### Sebagai Buyer
1. Login → browse services → klik service
2. Order service → bayar dengan Pi
3. Chat dengan seller untuk detail
4. Tunggu seller selesai
5. Kasih review setelah completed

### Sebagai Seller
1. Login → post jasa baru
2. Tunggu buyer order
3. Chat dengan buyer untuk detail
4. Kerjakan dan complete order
5. Terima pembayaran Pi

## 🚀 Development Mode

Saat ini pakai **mock login** untuk development:
- Klik "Login dengan Pi Network (Demo)"
- Auto-generate user baru
- Langsung bisa test semua fitur

## 🔧 Next Steps

### Production Ready
- [ ] Integrasi Pi SDK real di frontend
- [ ] Pi Network payment verification
- [ ] Socket.io server untuk real-time chat
- [ ] File upload untuk service images
- [ ] Email notifications

### Business Logic
- [ ] Platform fee (seller bayar fee ke platform)
- [ ] Refund mechanism
- [ ] Dispute resolution
- [ ] Seller verification badge
- [ ] Multi-milestone orders

### UI/UX Enhancement
- [ ] Responsive mobile design
- [ ] Dark mode
- [ ] Loading states
- [ ] Error boundaries
- [ ] Image optimization

## 📱 Pi Network Integration (Production)

Untuk integrasi Pi SDK di frontend:

```typescript
import { Pi } from '@pi-network/sdk'

const pi = new Pi({
  appId: process.env.NEXT_PUBLIC_PI_APP_ID!
})

// Login
const user = await pi.authenticate()
// POST /api/auth/login dengan user data

// Payment
const payment = await pi.createPayment({
  amount: order.amount,
  memo: `Order #${order.id}`,
  metadata: { orderId: order.id }
})
// POST /api/orders/payment dengan piTxId
```

## 📄 License

MIT
