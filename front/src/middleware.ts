import { NextRequest, NextResponse } from "next/server";

const PublicRoutes = [
  { path: "/", auth_redirect: false },
  { path: "/signin", auth_redirect: true },
  { path: "/signup", auth_redirect: true },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/signin";
const REDIRECT_WHEN_IS_AUTHENTICATED_ROUTE = "/charges";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const public_route = PublicRoutes.find((route) => route.path === path);

  const access_token = request.cookies.get("Authentication");

  if (!access_token && public_route) {
    return NextResponse.next();
  }

  if (!access_token && !public_route) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirect);
  }

  if (access_token && public_route && public_route.auth_redirect) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = REDIRECT_WHEN_IS_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirect);
  }

  if (access_token && !public_route) {
    // checar se o JWT não expirou
    return NextResponse.next();
  }

  return NextResponse.next();
}
