"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Backward from "@/../public/Backward.svg";
import VerticalDots from "@/../public/VerticalDots.svg";

export default function Home() {
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(true);

    return (
        <div className="bg-main  h-screen w-screen sm:w-[calc(100vw-24rem)]">
            <div className="px-4 py-2 min-h-16 flex content-center bg-white justify-between border-solid border-b border-gray-300/50">
                <div className="flex gap-4">
                    <Link
                        href={"/"}
                        className="flex justify-center px-3 sm:hidden"
                    >
                        <Image
                            src={Backward}
                            width={1}
                            height={1}
                            alt="Назад"
                            className="sm:hidden w-auto h-auto"
                        />
                    </Link>
                    <div className="w-12 h-12 rounded-full bg-gray-400/50"></div>
                    <div className="flex-1">
                        <h1 className="font-semibold">Маша</h1>
                        <h2 className="text-sm">был(а) в 16:31</h2>
                    </div>
                </div>

                <button>
                    <Image
                        src={VerticalDots}
                        alt="Настройки"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </div>
    );
}
