"use client";
/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

console.log("check access");
// window.history.

export const publicRoutes = [
  "/",
  "/s",
  "/p/:id",
  "/p/*",
  "/p/(.*)",
  "/p/:path*",
  "/p/**",
  "/api/test",
  "/api/stores/dflk320dflk",
  "/api",
  "/cart",
];

export const privateRoute = [
  "/s",
  "/account",
  "/admin",
  "/dashboard/*",
  "/checkout",
  "/checkout-complete",
  "/checkout-details",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /checkout
 * @type {string[]}
 */

export const authRoutes = ["/sign-in", "/sign-up"];

/**
 * The prefix for api autheniication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api";

/**
 * The default redirect path after loggin in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/account";
