import { Credentials } from "@/components/Auth/CredentialsAuth";
import QRLogin from "@/components/Auth/QRAuth";
import { Social } from "@/components/Auth/SocialAuth";
import Link from "next/link";
import QRCode from "@/../public/QRCode.svg";
import Image from "next/image";
import { addQueryString } from "@/utils/queryString";

export default function SignIn({
    searchParams,
}: {
    searchParams: { callbackUrl?: string; qrLogin?: string };
}) {
    return (
        <div className="w-screen h-dvh flex justify-center items-center bg-white sm:bg-transparent calc(var(--vh, 1vh) * 50)">
            <div className="rounded-md bg-white h-min w-full p-5 sm:w-min md:gap-10 sm:flex">
                <div className="flex justify-end">
                    <Link
                        href={`signIn?${addQueryString(
                            "qr-login",
                            new URLSearchParams(searchParams),
                        )}`}
                        className="ml-auto"
                    >
                        <Image
                            src={QRCode}
                            width={36}
                            height={36}
                            alt="qr-авторизация"
                        />
                    </Link>
                </div>

                <div>
                    <h1 className="text-center text-3xl">Авторизация</h1>
                    <Credentials />
                    <Social />
                </div>
                <QRLogin />
            </div>
        </div>
    );
}
