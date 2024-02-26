import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (
    !request.cookies.has('token') &&
    (request.nextUrl.pathname == '/' ||
      request.nextUrl.pathname.startsWith('/email'))
  ) {
    request.cookies.delete('token')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (
    request.cookies.has('token') &&
    (request.nextUrl.pathname == '/login' ||
      request.nextUrl.pathname == '/register-user' ||
      request.nextUrl.pathname == '/forgot-password' ||
      request.nextUrl.pathname.startsWith('/password'))
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
