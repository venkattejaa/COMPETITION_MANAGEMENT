import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard") || 
                        req.nextUrl.pathname.startsWith("/teams") || 
                        req.nextUrl.pathname.startsWith("/themes") || 
                        req.nextUrl.pathname.startsWith("/forum") || 
                        req.nextUrl.pathname.startsWith("/leaderboard") || 
                        req.nextUrl.pathname.startsWith("/profile") || 
                        req.nextUrl.pathname.startsWith("/admin");
  const isOnAuth = req.nextUrl.pathname.startsWith("/login");
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isCoordinator = req.auth?.user?.role === "COORDINATOR";

  if (isOnAuth) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${req.nextUrl.pathname}`, req.nextUrl));
  }

  if (isOnAdmin && (!isLoggedIn || !isCoordinator)) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/teams/:path*", "/themes/:path*", "/forum/:path*", "/leaderboard/:path*", "/profile/:path*", "/admin/:path*", "/login"],
};