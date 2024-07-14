import { PropsWithChildren } from "react";
import Image from "next/image";
import Exit from "@/../public/Exit.svg";
import Backward from "@/../public/Backward.svg";

export function AdaptiveModal({
    children,
    isOpen,
    modalName,
    close,
}: PropsWithChildren<{
    isOpen: boolean;
    modalName: string;
    close: () => void;
}>) {
    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen z-10 bg-gray-600/40 flex items-center justify-center ${
                isOpen ? "BackgroundVisible" : "BackgroundInvisible"
            }`}
            onClick={close}
        >
            <div
                className="bg-white border-solid border-gray-400/50 border p-2 sm:rounded-2xl w-full h-full sm:w-min sm:h-min"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-2 flex items-center gap-8 sm:justify-between">
                    <button className="sm:hidden" onClick={close}>
                        <Image
                            src={Backward}
                            alt="Закрыть"
                            width={18}
                            height={18}
                        />
                    </button>
                    <h1 className="text-lg flex-1">{modalName}</h1>
                    <button onClick={close} className="hidden sm:block">
                        <Image
                            src={Exit}
                            alt="Закрыть"
                            width={14}
                            height={14}
                        />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
