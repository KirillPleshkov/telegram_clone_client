"use client";

import { addQueryString, deleteQueryString } from "@/utils/queryString";
import styles from "./Menu.module.css";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Profile } from "@/components/modals/Profile";
import QRSignIn from "@/components/modals/QRSignIn";
import { useCallback, useState } from "react";
import MenuImg from "@/../public/Menu.svg";

export const Menu = () => {
    const { data: session } = useSession();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
    const [isOpenQRCode, setIsOpenQRCode] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)}>
                <Image src={MenuImg} alt="Меню" width={36} height={36} />
            </button>
            <div
                className={`fixed left-0 top-0 w-screen h-full z-10 bg-gray-600/40 ${
                    isOpen
                        ? styles.menuBackgroundVisible
                        : styles.menuBackgroundInvisible
                }`}
            >
                <div
                    className={`w-72 bg-white h-full ${
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
                                        process.env
                                            .NEXT_PUBLIC_MEDIA_BACKEND_URL +
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
                                <button
                                    className="h-12 w-full"
                                    onClick={() => {
                                        setIsOpenProfile(true);
                                        setIsOpen(false);
                                    }}
                                >
                                    Профиль
                                </button>
                            </li>
                            <li>
                                <button className="h-12 w-full">
                                    Создать группу
                                </button>
                            </li>
                            <li>
                                <button className="h-12 w-full">
                                    Контакты
                                </button>
                            </li>
                            <li>
                                <button
                                    className="h-12 w-full"
                                    onClick={() => {
                                        setIsOpenQRCode(true);
                                        setIsOpen(false);
                                    }}
                                >
                                    Вход по QR
                                </button>
                            </li>
                            <li>
                                <button className="h-12 w-full">
                                    Настройки
                                </button>
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
                    onClick={() => setIsOpen(false)}
                ></div>
            </div>
            <Profile
                isOpen={isOpenProfile}
                close={() => setIsOpenProfile(false)}
            />
            <QRSignIn
                isOpen={isOpenQRCode}
                close={() => setIsOpenQRCode(false)}
            />
        </>
    );
};
