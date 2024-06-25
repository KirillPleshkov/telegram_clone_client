"use client";

import {
    ChangeEventHandler,
    FocusEventHandler,
    MouseEventHandler,
    PropsWithChildren,
    useState,
} from "react";
import MenuImg from "@/../public/Menu.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Exit from "@/../public/Exit.svg";
import { Menu } from "./Menu";
import { Profile } from "../modals/Profile";
import QRSignIn from "../modals/QRSignIn";

const channels = [
    {
        id: 1,
        img: "",
        name: "Маша",
        last_message: {
            id: 1,
            text: "привет",
            time: new Date(),
            author: "маша",
        },
    },
    {
        id: 2,
        img: "",
        name: "Петяttttttttttttttttttttttttttttttt676666666666666666666666",
        last_message: {
            id: 1,
            text: "хайttttttttttttttttttttttttttttttt666666666666666666666666666666",
            time: new Date(),
            author: "петя",
        },
    },
];

const Sidebar = ({ children }: PropsWithChildren<unknown>) => {
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
        <div className="flex">
            <div
                className={`w-screen flex-1 bg-white h-screen border-r-2 border-solid border-black-900 fixed sm:w-96
                    ${pathname === "/" ? "block" : "hidden"}
                    ${pathname === "/signIn" ? "sm:hidden" : "sm:block"}`}
            >
                <div className="w-full h-16 p-3 flex gap-3 items-center">
                    <button onClick={() => setIsOpenMenu(true)}>
                        <Image
                            src={MenuImg}
                            alt="Меню"
                            width={36}
                            height={36}
                        />
                    </button>
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
                    {channels.filter((channel) =>
                        channel.name
                            .toLowerCase()
                            .includes(search.toLowerCase()),
                    ).length === 0 && (
                        <h4 className="w-full text-center p-5">
                            Каналы не найдены
                        </h4>
                    )}
                    {channels
                        .filter((channel) =>
                            channel.name
                                .toLowerCase()
                                .includes(search.toLowerCase()),
                        )
                        .map((channel) => (
                            <Link key={channel.id} href={`/${channel.id}`}>
                                <div
                                    className={`w-full h-20 hover:bg-gray-900/5 transition-colors duration-200 ease-in-out cursor-pointer flex p-3 flex-nowrap
                                        ${
                                            "/" + channel.id == pathname &&
                                            "bg-sky-600/80 hover:bg-sky-600/80"
                                        }`}
                                >
                                    <div className="w-14 rounded-full bg-gray-400/50 mx-3"></div>
                                    <div className="p-1 flex-1 min-w-0">
                                        <h2
                                            className={`font-semibold text-x max-w-full overflow-hidden text-ellipsis
                                                ${
                                                    "/" + channel.id ==
                                                        pathname && "text-white"
                                                }`}
                                        >
                                            {channel.name}
                                        </h2>
                                        <h3
                                            className={`font-light text-x overflow-hidden text-ellipsis
                                                ${
                                                    "/" + channel.id ==
                                                        pathname && "text-white"
                                                }`}
                                        >
                                            {channel.last_message.text}
                                        </h3>
                                    </div>
                                    <div className="pl-4 flex-shrink-0">
                                        <h3
                                            className={`text-sm ${
                                                "/" + channel.id == pathname &&
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
            <div
                className={`w-screen h-screen flex-1 sm:w-96
                    ${pathname === "/" ? "block" : "hidden"}
                    ${pathname === "/signIn" ? "sm:hidden" : "sm:block"}`}
            ></div>
            <Menu isOpen={isOpenMenu} close={() => setIsOpenMenu(false)} />

            <Profile isOpen={searchParams.has("profile")} />
            <QRSignIn isOpen={searchParams.has("qr-signin")} />

            {children}
        </div>
    );
};

export default Sidebar;
