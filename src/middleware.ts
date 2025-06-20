import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession()

  console.log('Middleware - Current pathname:', request.nextUrl.pathname)
  console.log('Middleware - Session exists:', !!session)

  // If accessing dashboard routes without session, redirect to login
  // if (request.nextUrl.pathname.startsWith('/dashboard') && !session) {
  //   console.log('Middleware - Redirecting to login (no session)')
  //   const redirectUrl = new URL('/login', request.url)
  //   return NextResponse.redirect(redirectUrl)
  // }

  // If accessing login page with session, redirect to dashboard
  // if (request.nextUrl.pathname === '/login' && session) {
  //   console.log('Middleware - Redirecting to dashboard (has session)')
  //   const redirectUrl = new URL('/dashboard', request.url)
  //   return NextResponse.redirect(redirectUrl)
  // }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 