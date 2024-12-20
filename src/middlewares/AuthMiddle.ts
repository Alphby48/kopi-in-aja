/* eslint-disable @typescript-eslint/no-unused-vars */
import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function AuthMiddle(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const path = req.nextUrl.pathname;
    const adminOnly = ["/admin", "/admin/add-product"];
    const requireAuthPath = ["/product/**", ...requireAuth];

    const mathPoint = (pathname: string) => {
      return requireAuthPath.some((pattern) => {
        const regex = new RegExp(
          `^${pattern.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*")}$`
        );
        return regex.test(pathname);
      });
    };

    if (mathPoint(path)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token?.role !== "admin" && adminOnly.includes(path)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  };
}
