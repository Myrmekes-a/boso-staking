import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      /* if (req.nextUrl.pathname.startsWith("/protected") && token === null) {
        return false;
      } */

      const path = req.nextUrl.pathname;

      if (new RegExp("/dashboard/[^/]").test(path) && !token?.wallet) {
        console.log("DASHBOARD: no wallet");
        return false;
      }

      return true;
    },
  },
});
