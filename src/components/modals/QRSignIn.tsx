"use client";

import { useEffect, useState } from "react";
import QRScanner from "../QRScanner/QRScanner";
import { AdaptiveModal } from "./AdaptiveModal";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function QRSignIn({
    isOpen,
    close,
}: {
    isOpen: boolean;
    close: () => void;
}) {
    const [scannedText, setScannedText] = useState<string | null>(null);
    const router = useRouter();

    const handlerScan = (result: string) => {
        setScannedText(result);
    };

    const { data: session } = useSession();

    useEffect(() => {
        if (!scannedText) {
            return;
        }

        axios
            .post(
                process.env.NEXT_PUBLIC_BACKEND_URL +
                    "authentication/qr_login/",
                { qr_token: scannedText },
                {
                    headers: {
                        Authorization: `Bearer ${session?.access_token}`,
                    },
                },
            )
            .then(({ data }) => {
                if (data.success) {
                    router.back();
                }
            });
    }, [router, scannedText, session?.access_token]);

    return (
        <AdaptiveModal isOpen={isOpen} close={close} modalName="QR-сканер">
            <div className="p-2 flex flex-col gap-3 items-center">
                <h1 className="text-lg text-center">Отсканируйте QR-код</h1>
                <QRScanner isOpen={isOpen} onScan={handlerScan} />
            </div>
        </AdaptiveModal>
    );
}
