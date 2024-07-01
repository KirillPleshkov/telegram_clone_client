"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import "./QRScanner.css";

const QRScanner = ({
    isOpen,
    onScan,
}: {
    isOpen: boolean;
    onScan: (res: string) => void;
}) => {
    const [html5QrcodeScanner, setHtml5QrcodeScanner] =
        useState<Html5Qrcode | null>(null);

    useEffect(() => {
        const config = { fps: 5, qrbox: { width: 250, height: 250 } };

        if (html5QrcodeScanner === null) {
            setHtml5QrcodeScanner(new Html5Qrcode("qrCodeContainer"));
            return;
        }

        const QRScannerStop = () => {
            if (html5QrcodeScanner) {
                try {
                    html5QrcodeScanner.stop();
                } catch (e) {}
            }
        };

        if (isOpen) {
            html5QrcodeScanner.start(
                { facingMode: "environment" },
                config,
                (res) => {
                    onScan(res);
                },
                undefined,
            );
        } else {
            QRScannerStop();
        }

        return () => {
            () => QRScannerStop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return <div id="qrCodeContainer" />;
};

export default QRScanner;
