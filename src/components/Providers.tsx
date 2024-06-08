import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren<unknown>) => {
    return <SessionProvider>{children}</SessionProvider>;
};
