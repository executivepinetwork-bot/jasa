import type { PrismaClient } from '@prisma/client'

const DUMMY_STORE_PI_ID = 'pi-store-demo'
const DUMMY_STORE_USERNAME = 'pi_store_demo'

export const DUMMY_PRODUCTS = [
  {
    title: 'Pi Starter Sticker Pack',
    description:
      'A lightweight demo product for Pi Browser checkout testing. Includes a small pack of Pi-themed stickers and sample packaging.',
    price: 0.35,
    category: 'merchandise',
    deliveryDays: 1,
    image: null,
  },
  {
    title: 'Pi Notebook Mini',
    description:
      'Compact notebook product for testing a low-value Pi transaction flow. Great for validating login, order creation, and payment.',
    price: 0.75,
    category: 'office',
    deliveryDays: 2,
    image: null,
  },
  {
    title: 'Pi Coffee Mug',
    description:
      'Simple merchandise item priced below 1 Pi so you can verify the full storefront and payment experience quickly.',
    price: 1.2,
    category: 'merchandise',
    deliveryDays: 2,
    image: null,
  },
  {
    title: 'Pi Gift Box',
    description:
      'Gift-ready demo product for mid-range Pi payment tests. Useful when you want to try a purchase closer to 2 Pi.',
    price: 2.4,
    category: 'gift',
    deliveryDays: 3,
    image: null,
  },
  {
    title: 'Pi Desk Bundle',
    description:
      'Bundle item capped under 3 Pi for safe transaction testing inside Pi Browser with a slightly higher checkout amount.',
    price: 2.95,
    category: 'office',
    deliveryDays: 3,
    image: null,
  },
] as const

export async function ensureDummyStoreData(prisma: PrismaClient) {
  let user = await prisma.user.findUnique({ where: { piId: DUMMY_STORE_PI_ID } })

  if (!user) {
    user = await prisma.user.create({
      data: {
        piId: DUMMY_STORE_PI_ID,
        username: DUMMY_STORE_USERNAME,
        bio: 'Official demo storefront for Pi Browser transaction testing.',
      },
    })
  }

  const existingServices = await prisma.service.findMany({
    where: {
      userId: user.id,
      title: { in: DUMMY_PRODUCTS.map((product) => product.title) },
    },
  })

  const existingByTitle = new Map(existingServices.map((service) => [service.title, service]))

  for (const product of DUMMY_PRODUCTS) {
    const existing = existingByTitle.get(product.title)

    if (!existing) {
      await prisma.service.create({
        data: {
          ...product,
          active: true,
          userId: user.id,
        },
      })
      continue
    }

    await prisma.service.update({
      where: { id: existing.id },
      data: {
        ...product,
        active: true,
      },
    })
  }
}