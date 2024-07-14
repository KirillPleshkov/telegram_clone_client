"use client";

import { AdaptiveModal } from "./AdaptiveModal";
import Image from "next/image";
import { useSession } from "next-auth/react";

export function Profile({
    isOpen,
    close,
}: {
    isOpen: boolean;
    close: () => void;
}) {
    const { data: session } = useSession();

    return (
        <AdaptiveModal isOpen={isOpen} close={close} modalName="Профиль">
            <div className="min-w-52">
                <div className="flex items-center gap-4 p-2 border-solid border-gray-400/50 border-b">
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
            <div></div>
        </AdaptiveModal>
    );
}
