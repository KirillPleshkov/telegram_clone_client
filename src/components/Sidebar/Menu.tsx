"use client";

import { auth } from "@/auth";
import styles from "./Menu.module.css";
import { useSession } from "next-auth/react";

type MenuProps = {
    isOpen: boolean;
    close: () => void;
};

export const Menu = ({ isOpen, close }: MenuProps) => {
    const session = useSession();

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
                    <div className="w-14 h-14 rounded-full bg-gray-400/50"></div>
                    <h2 className="font-normal">{session.data?.user?.email}</h2>
                </div>
            </div>

            <div
                className={"w-screen h-screen flex-1"}
                onClick={() => close()}
            ></div>
        </div>
    );
};
