import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/Providers";
import Sidebar from "@/components/Sidebar/Sidebar";

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
                    <Providers>{children}</Providers>
                </main>
            </body>
        </html>
    );
}
