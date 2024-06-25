import Link from "next/link";
import {
    ReadonlyURLSearchParams,
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { PropsWithChildren } from "react";
import Image from "next/image";
import Exit from "@/../public/Exit.svg";
import Backward from "@/../public/Backward.svg";

export const deleteQueryString = (
    name: string,
    searchParams: ReadonlyURLSearchParams,
) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);

    return params.toString();
};

export function AdaptiveModal({
    children,
    isOpen,
    queryKey,
    modalName,
}: PropsWithChildren<{
    isOpen: boolean;
    queryKey: string;
    modalName: string;
}>) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div
            className={`fixed w-screen h-screen z-10 bg-gray-600/40 flex items-center justify-center ${
                isOpen ? "BackgroundVisible" : "BackgroundInvisible"
            }`}
            onClick={() =>
                router.push(
                    `${pathname}?${deleteQueryString(queryKey, searchParams)}`,
                )
            }
        >
            <div
                className="bg-white border-solid border-gray-400/50 border p-2 sm:rounded-2xl w-full h-full sm:w-min sm:h-min"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-2 flex items-center gap-8 sm:justify-between">
                    <Link
                        href={{
                            pathname,
                            query: deleteQueryString(queryKey, searchParams),
                        }}
                        className="sm:hidden"
                    >
                        <Image
                            src={Backward}
                            alt="Закрыть"
                            width={18}
                            height={18}
                        />
                    </Link>
                    <h1 className="text-lg flex-1">{modalName}</h1>
                    <Link
                        href={{
                            pathname,
                            query: deleteQueryString(queryKey, searchParams),
                        }}
                        className="hidden sm:block"
                    >
                        <Image
                            src={Exit}
                            alt="Закрыть"
                            width={14}
                            height={14}
                        />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
