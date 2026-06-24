import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Demo login has been removed. Please sign in with Pi Network via /api/auth/pi.' },
    { status: 410 }
  )
}