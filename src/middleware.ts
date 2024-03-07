import NextAuth from "next-auth";

import authConfig from "@/config/auth";
import {
	DEFAULT_LOGIN_REDIRECT,
	authRoutes,
	protectedRoutes,
} from "@/config/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return null;
	}

	if (!isLoggedIn && isProtectedRoute) {
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl);

		return Response.redirect(
			new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl)
		);
	}

	return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: [
		"/((?!.+\\.[\\w]+$|_next|favicon.ico|opengraph-image.jpg|notes|computer\\-engineering|mechanical\\-engineering).*)",
		"/",
		"/(api|trpc)(.*)",
	],
};
