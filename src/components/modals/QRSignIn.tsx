"use client";

import { useEffect, useState } from "react";
import QRScanner from "../QRScanner/QRScanner";
import { AdaptiveModal } from "./AdaptiveModal";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function QRSignIn({ isOpen }: { isOpen: boolean }) {
    const [scannedText, setScannedText] = useState<string | null>(null);

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
                }
            });
    }, [scannedText, session?.access_token]);

    return (
        <AdaptiveModal
            isOpen={isOpen}
            queryKey="qr-signin"
            modalName="QR-сканер"
        >
            <div className="p-2 flex flex-col gap-3 items-center">
                <h1 className="text-lg text-center">Отсканируйте QR-код</h1>
                <QRScanner isOpen={isOpen} onScan={handlerScan} />
            </div>
        </AdaptiveModal>
    );
}
