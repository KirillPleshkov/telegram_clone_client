"use client";

import { useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

import QRCode from "react-qr-code";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { deleteQueryString } from "@/utils/queryString";
import Backward from "@/../public/Backward.svg";
import Loading from "../UI/Loading";

export default function QRLogin() {
    const [qrValue, setQrValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const websocketMessage = useCallback(
        async (data: MessageEvent<any>) => {
            const req = JSON.parse(data.data);
            if (req.qr_data) {
                setQrValue(req.qr_data);
            }
            if (req.refresh) {
                setIsLoading(true);
                const result = await signIn("credentials", {
                    refresh: req.refresh,
                    redirect: false,
                });
                setIsLoading(false);
                if (result && !result.error) {
                    router.push(searchParams.get("callbackUrl") || "/");
                }
            }
        },
        [router, searchParams],
    );

    const { sendMessage } = useWebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}qr_auth/`,
        {
            onOpen: () => sendMessage("update_qr"),
            onMessage: websocketMessage,
            shouldReconnect: (closeEvent) => true,
        },
    );

    useEffect(() => {
        const qrUpdater = setInterval(() => sendMessage("update_qr"), 10000);
        return () => clearInterval(qrUpdater);
    }, [sendMessage]);

    return (
        <div
            className={`p-2 mt-3 md:p-5 sm:flex  
            ${
                searchParams.has("qr-login")
                    ? "fixed sm:static bg-white w-full h-full left-0 top-0"
                    : "hidden"
            }`}
        >
            <Link
                href={{
                    pathname: "signIn",
                    query: deleteQueryString("qr-login", searchParams),
                }}
                className="sm:hidden block w-max p-1 m-2"
            >
                <Image src={Backward} alt="Закрыть" width={20} height={20} />
            </Link>
            <div className="flex justify-center items-center flex-col gap-2">
                <label className="block">Войти с помощью qr-кода</label>
                <QRCode
                    value={qrValue}
                    bgColor={"white"}
                    fgColor={"black"}
                    size={210}
                    className="p-1"
                />
            </div>
            {isLoading && <Loading />}
        </div>
    );
}
