"use client";

import Image from "next/image";
import Link from "next/link";

import {
    ChangeEventHandler,
    FocusEventHandler,
    MouseEventHandler,
    useState,
} from "react";

import { usePathname, useSearchParams } from "next/navigation";
import Exit from "@/../public/Exit.svg";
import { addQueryString } from "@/utils/queryString";
import { IChats } from "@/types/Chat.type";
import { Menu } from "./Sidebar/Menu";

type ChatsProps = {
    chats: IChats;
};

export default function Chats({ chats }: ChatsProps) {
    const [search, setSearch] = useState<string>("");
    const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const searchInputChangeHandler: ChangeEventHandler<HTMLInputElement> = (
        e,
    ) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const searchInputBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
        setTimeout(() => setIsSearchFocus(false), 100);
    };

    const searchInputFocusHandler: FocusEventHandler<HTMLInputElement> = () => {
        setIsSearchFocus(true);
    };

    const searchInputCloseHandler: MouseEventHandler<HTMLButtonElement> = (
        e,
    ) => {
        e.preventDefault();
        setSearch("");
    };

    return (
        <div>
            <div className="w-full h-16 p-3 flex gap-3 items-center">
                <Menu />
                <form className="flex-1 pr-2 relative">
                    <input
                        value={search}
                        onChange={searchInputChangeHandler}
                        onBlur={searchInputBlurHandler}
                        onFocus={searchInputFocusHandler}
                        type="text"
                        className="w-full bg-gray-200/90 rounded-2xl py-2 px-3 text-sm outline-none focus:border-solid
                                     focus:border-gray-400/50 focus:border-2 focus:bg-white transition-colors duration-300 ease-in-out"
                    />
                    {isSearchFocus && (
                        <button
                            onClick={searchInputCloseHandler}
                            className="absolute right-4 top-2 text-center p-1"
                        >
                            <Image
                                src={Exit}
                                alt="Очистить"
                                width={14}
                                height={14}
                            />
                        </button>
                    )}
                </form>
            </div>
            <div>
                {chats.filter((chat) =>
                    chat.name.toLowerCase().includes(search.toLowerCase()),
                ).length === 0 && (
                    <h4 className="w-full text-center p-5">
                        Каналы не найдены
                    </h4>
                )}
                {chats
                    .filter((chat) =>
                        chat.name.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((chat) => (
                        <Link key={chat.id} href={`/${chat.id}`}>
                            <div
                                className={`w-full h-20 hover:bg-gray-900/5 transition-colors duration-200 ease-in-out cursor-pointer flex p-3 flex-nowrap
                                        ${
                                            "/" + chat.id == pathname &&
                                            "bg-sky-600/80 hover:bg-sky-600/80"
                                        }`}
                            >
                                {!!chat.logo ? (
                                    <Image
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_MEDIA_BACKEND_URL +
                                            chat.logo
                                        }
                                        alt="Аватарка"
                                        width={56}
                                        height={56}
                                        className="rounded-full border-solid border-2 border-gray-400/50 mx-3"
                                    />
                                ) : (
                                    <div className="w-14 rounded-full bg-gray-400/50 mx-3"></div>
                                )}

                                <div className="p-1 flex-1 min-w-0">
                                    <h2
                                        className={`font-semibold text-x max-w-full overflow-hidden text-ellipsis
                                                ${
                                                    "/" + chat.id == pathname &&
                                                    "text-white"
                                                }`}
                                    >
                                        {chat.name}
                                    </h2>
                                    <h3
                                        className={`font-light text-x overflow-hidden text-ellipsis whitespace-nowrap
                                                ${
                                                    "/" + chat.id == pathname &&
                                                    "text-white"
                                                }`}
                                    >
                                        Тескт последнего сообщения
                                    </h3>
                                </div>
                                <div className="pl-4 flex-shrink-0">
                                    <h3
                                        className={`text-sm ${
                                            "/" + chat.id == pathname &&
                                            "text-white"
                                        }`}
                                    >
                                        20:45
                                    </h3>

                                    <div className="w-5 h-5 rounded-full bg-gray-400/50 m-auto mt-2"></div>
                                </div>
                                <div></div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
