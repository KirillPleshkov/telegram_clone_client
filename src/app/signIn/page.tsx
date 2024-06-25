"use client";

import QRCode from "react-qr-code";
import { Credentials } from "./credentials";
import { Social } from "./social";

import { useEffect, useRef } from "react";

export default function SignIn() {
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (ws.current) {
            return;
        }
        ws.current = new WebSocket("ws://localhost:8000/ws/qr_auth/");
        ws.current.onopen = () => console.log("Соединение открыто");
        ws.current.onclose = (e) => console.log("Соединение закрыто", e);
        ws.current.onmessage = (e) => {
            const message = JSON.parse(e.data);
            console.log(message);
        };

        return () => {
            if (ws.current) {
                console.log(1);
                ws.current.close();
            }
        };
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-white sm:bg-transparent calc(var(--vh, 1vh) * 50)">
            <div className="rounded-md bg-white h-min w-full p-5 sm:w-min md:gap-10 sm:flex">
                <div>
                    <h1 className="text-center text-3xl">Авторизация</h1>
                    <Credentials />
                    <Social />
                </div>
                <div className="p-2 md:p-5 hidden sm:block">
                    <label>Войти с помощью qr-кода</label>
                    <QRCode
                        value={"aaaaaa"}
                        bgColor={"white"}
                        fgColor={"black"}
                        size={210}
                        className="p-1"
                    />
                    <h2></h2>
                </div>
            </div>
        </div>
    );
}
