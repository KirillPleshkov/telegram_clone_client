"use client";

import { useEffect, useState } from "react";
import QRScanner from "../QRScanner/QRScanner";
import { AdaptiveModal } from "./AdaptiveModal";

export default function QRSignIn({ isOpen }: { isOpen: boolean }) {
    const [scannedText, setScannedText] = useState<string | null>(null);

    const handlerScan = (result: string) => {
        console.log(result);
        setScannedText(result);
    };

    useEffect(() => {
        if (!scannedText) {
            return;
        }
    }, [scannedText]);

    return (
        <AdaptiveModal
            isOpen={isOpen}
            queryKey="qr-signin"
            modalName="QR-сканер"
        >
            <div className="p-2 flex flex-col gap-3 items-center">
                <h1 className="text-lg text-center">Отсканируйте QR-код</h1>
                <QRScanner isOpen={isOpen} onScan={handlerScan} />
                <h1>{scannedText}</h1>
            </div>
        </AdaptiveModal>
    );
}
