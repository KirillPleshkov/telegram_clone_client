// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const privatePaths = [/^\/$/, /^\/[0-9]*$/];

export default auth(async (req) => {
    const url = req.nextUrl;

    const isPrivatePath = privatePaths.some((e) => e.test(url.pathname));

    if (isPrivatePath && !req.auth) {
        const callbackUrl = encodeURIComponent(url.toString());
        const loginUrl = new URL(
            `/signIn?callbackUrl=${callbackUrl}`,
            url.origin,
        );
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/:path*"],
};
