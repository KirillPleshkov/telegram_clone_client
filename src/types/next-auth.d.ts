import NextAuth, { DefaultToken } from "next-auth";
import { TypeUser } from "./User.type";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
        access_token: string;
    }
    interface User extends TypeUser {}
    interface Account {
        meta: TypeTokenResponse;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        ref: number;
    }
}
