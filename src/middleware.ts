import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
  const isProtectedRoute = 
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/resume-analyzer') ||
    req.nextUrl.pathname.startsWith('/interview-prep') ||
    req.nextUrl.pathname.startsWith('/job-matcher') ||
    req.nextUrl.pathname.startsWith('/history') ||
    req.nextUrl.pathname.startsWith('/settings');

  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/resume-analyzer/:path*",
    "/interview-prep/:path*",
    "/job-matcher/:path*",
    "/history/:path*",
    "/settings/:path*",
    "/auth/:path*",
  ],
};