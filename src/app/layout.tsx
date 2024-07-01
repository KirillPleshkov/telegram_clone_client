import { Inter } from "next/font/google";
import "../styles/globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Providers } from "@/components/Providers";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <main>
                    <Providers>
                        <Suspense>
                            <Sidebar>{children}</Sidebar>
                        </Suspense>
                    </Providers>
                </main>
            </body>
        </html>
    );
}
