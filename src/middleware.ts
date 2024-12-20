/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import AuthMiddle from "./middlewares/AuthMiddle";

export function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default AuthMiddle(mainMiddleware, [
  "/admin",
  "/admin/add-product",
  "/auth/register/admin",
  "/product",
  "/product/**",
  "/order",
  "/profile",
]);
