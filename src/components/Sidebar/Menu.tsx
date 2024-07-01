"use client";

import { addQueryString } from "@/utils/queryString";
import styles from "./Menu.module.css";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
    ReadonlyURLSearchParams,
    usePathname,
    useSearchParams,
} from "next/navigation";

type MenuProps = {
    isOpen: boolean;
    close: () => void;
};

export const Menu = ({ isOpen, close }: MenuProps) => {
    const { data: session } = useSession();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    return (
        <div
            className={`fixed w-screen h-screen z-10 bg-gray-600/40 ${
                isOpen
                    ? styles.menuBackgroundVisible
                    : styles.menuBackgroundInvisible
            }`}
        >
            <div
                className={`w-72 bg-white h-screen ${
                    isOpen
                        ? styles.menuContainerVisible
                        : styles.menuContainerInvisible
                }`}
            >
                <div className="p-6 border-solid border-b border-gray-300/50 flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                        {session?.user.image ? (
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_MEDIA_BACKEND_URL +
                                    session.user.image
                                }
                                alt="Аватарка"
                                width={50}
                                height={50}
                                className="rounded-full border-solid border-2 border-gray-300/50"
                            />
                        ) : (
                            <div className="w-14 h-14 rounded-full bg-gray-400/50"></div>
                        )}

                        <h2 className="font-normal h-min">
                            {session?.user.username}
                        </h2>
                    </div>
                </div>
                <div>
                    <ul>
                        <li>
                            <Link
                                href={{
                                    pathname,
                                    query: addQueryString(
                                        "profile",
                                        searchParams,
                                    ),
                                }}
                            >
                                <button className="h-12 w-full" onClick={close}>
                                    Профиль
                                </button>
                            </Link>
                        </li>
                        <li>
                            <button className="h-12 w-full">
                                Создать группу
                            </button>
                        </li>
                        <li>
                            <button className="h-12 w-full">Контакты</button>
                        </li>
                        <li>
                            <Link
                                href={{
                                    pathname,
                                    query: addQueryString(
                                        "qr-signin",
                                        searchParams,
                                    ),
                                }}
                            >
                                <button className="h-12 w-full" onClick={close}>
                                    Вход по QR
                                </button>
                            </Link>
                        </li>
                        <li>
                            <button className="h-12 w-full">Настройки</button>
                        </li>
                        <li>
                            <button
                                className="h-12 w-full"
                                onClick={() => signOut()}
                            >
                                Выход
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                className={"w-screen h-screen flex-1"}
                onClick={() => close()}
            ></div>
        </div>
    );
};
