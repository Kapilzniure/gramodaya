import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  // If frontend-only dev mode is enabled, skip middleware logic that
  // initializes Supabase or depends on backend services.
  if (process.env.NEXT_PUBLIC_FRONTEND_ONLY === 'true') {
    return NextResponse.next()
  }

  const res = NextResponse.next()
  // Ensure Supabase env variables are present; if not, skip auth enforcement
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) {
    // Without env, we cannot evaluate session; allow request to proceed
    return res
  }

  const supabase = createMiddlewareClient({ req, res, supabaseUrl, supabaseKey })
  const { data } = await supabase.auth.getSession()

  if (data?.session && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Must be a session to see these routes
  if (
    !data?.session && (
      req.nextUrl.pathname.startsWith('/checkout') ||
      req.nextUrl.pathname.startsWith('/success') ||
      req.nextUrl.pathname.startsWith('/orders') ||
      req.nextUrl.pathname.startsWith('/address')
    )
  ) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return res
}


