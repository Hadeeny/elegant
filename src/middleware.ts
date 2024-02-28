import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAUTL_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
} from "@/all-routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  const { nextUrl } = req;
  const isLoggedIn = req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAUTL_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
