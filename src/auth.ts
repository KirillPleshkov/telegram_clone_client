import axios from "axios";
import NextAuth, { Account, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider, {
    CredentialInput,
} from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";
import { TypeTokenResponse } from "./types/TokenResponse.type";

type TypeSignIn = {
    user: User | AdapterUser;
    account: Account | null;
    profile?: Profile;
    email?: {
        verificationRequest?: boolean;
    };
    credentials?: Record<string, CredentialInput>;
};

const BACKEND_ACCESS_TOKEN_LIFETIME = 60 * 60; // 60 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 7 * 24 * 60 * 60; // 7 days

const getCurrentEpochTime = () => {
    return Math.floor(new Date().getTime() / 1000);
};

const getUser = async (access_token: string) => {
    return await axios
        .get<User>(process.env.NEXTAUTH_BACKEND_URL + "user/", {
            headers: { Authorization: `Bearer ${access_token}` },
        })
        .then(({ data }) => {
            return data;
        })
        .catch((e) => {
            console.error(e);
            return null;
        });
};

const SIGN_IN_HANDLERS = {
    credentials: async ({}: TypeSignIn) => {
        return true;
    },
    github: async ({ account }: TypeSignIn) => {
        if (!account) {
            return false;
        }
        return await axios
            .post<TypeTokenResponse>(
                process.env.NEXTAUTH_BACKEND_URL + "authentication/github/",
                {
                    access_token: account.access_token,
                },
            )
            .then(({ data }) => {
                account.meta = data;
                return true;
            })
            .catch((e) => {
                console.error(e);
                return false;
            });
    },
    yandex: async ({ account }: TypeSignIn) => {
        if (!account) {
            return false;
        }
        return await axios
            .post<TypeTokenResponse>(
                process.env.NEXTAUTH_BACKEND_URL + "authentication/yandex/",
                {
                    access_token: account.access_token,
                },
            )
            .then(({ data }) => {
                account.meta = data;
                return true;
            })
            .catch((e) => {
                console.error(e);
                return false;
            });
    },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                username: {
                    label: "Username",
                    type: "username",
                },
                password: { label: "Password", type: "password" },
                refresh: { label: "refresh", type: "text" },
            },
            async authorize(credentials) {
                if (credentials.username && credentials.password) {
                    return await axios
                        .post(
                            process.env.NEXTAUTH_BACKEND_URL +
                                "authentication/login/",
                            credentials,
                        )
                        .then(({ data }) => {
                            return data;
                        })
                        .catch((e) => {
                            console.error(e);
                            return null;
                        });
                }
                if (credentials.refresh) {
                    return await axios
                        .post(
                            process.env.NEXTAUTH_BACKEND_URL +
                                "authentication/token/refresh/",
                            { refresh: credentials.refresh },
                        )
                        .then(({ data }) => {
                            return {
                                ...data,
                                refresh: credentials.refresh,
                            };
                        })
                        .catch((e) => {
                            console.error(e);
                            return null;
                        });
                }
            },
        }),
        GitHubProvider({
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        YandexProvider({
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    session: { strategy: "jwt", maxAge: BACKEND_REFRESH_TOKEN_LIFETIME },
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
    pages: {
        signIn: "/signIn",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (!account || !SIGN_IN_PROVIDERS.includes(account.provider))
                return false;
            const providerName =
                account.provider as keyof typeof SIGN_IN_HANDLERS;
            return SIGN_IN_HANDLERS[providerName]({
                user,
                account,
                profile,
                email,
                credentials,
            });
        },
        async jwt({ user, token, account }) {
            let newToken: TypeTokenResponse | null = null;

            if (user && account) {
                const backendResponse = (
                    account.provider === "credentials" ? user : account.meta
                ) as { access: string; refresh: string };
                newToken = backendResponse;
            }

            if (getCurrentEpochTime() > (token.ref as number)) {
                const response = await axios.post<TypeTokenResponse>(
                    process.env.NEXTAUTH_BACKEND_URL +
                        "authentication/token/refresh/",
                    { refresh: token.refresh_token },
                );
                newToken = response.data;
            }

            if (newToken) {
                token.access_token = newToken.access;
                token.refresh_token = newToken.refresh;
                token.ref =
                    getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
                token.user = await getUser(newToken.access);
            }
            return token;
        },
        async session({ token, session }) {
            return {
                access_token: token.access_token as string,
                user: token.user as User,
                expires: session.expires,
            };
        },
    },
});
