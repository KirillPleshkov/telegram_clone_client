import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                return credentials as User;
            },
        }),
    ],
    session: { strategy: "jwt" },
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
    },
    pages: {
        signIn: "/signIn",
    },
});
