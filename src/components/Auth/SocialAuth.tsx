"use client";

import Image from "next/image";
import Yandex from "@/../public/Yandex.svg";
import Github from "@/../public/Github.svg";
import { FormEventHandler } from "react";
import { signIn } from "next-auth/react";

export function Social() {
    const LoginGithub: FormEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        await signIn("github");
    };
    const LoginYandex: FormEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        await signIn("yandex");
    };

    return (
        <div className="flex justify-around">
            <button onClick={LoginGithub}>
                <Image src={Github} width={40} height={40} alt="Github" />
            </button>

            <button onClick={LoginYandex}>
                <Image src={Yandex} width={40} height={40} alt="Яндекс" />
            </button>
        </div>
    );
}
