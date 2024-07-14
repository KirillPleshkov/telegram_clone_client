import { PropsWithChildren } from "react";
import { Menu } from "./Menu";
import Chats from "@/components/Chats";
import { auth } from "@/auth";
import { IChats } from "@/types/Chat.type";
import { api } from "@/utils/fetchTyped";

const getChats = (access: string): Promise<IChats> => {
    return api<IChats>(`${process.env.NEXT_PUBLIC_BACKEND_URL}chat/`, {
        headers: { Authorization: `Bearer ${access}` },
    });
};

const Sidebar = async ({ children }: PropsWithChildren<unknown>) => {
    const session = await auth();

    if (!session) {
        return <div>{children}</div>;
    }

    const chats = await getChats(session.access_token);

    return (
        <div className="flex fixed h-full w-full">
            <div
                className={`w-screen flex-1 bg-white h-full border-r-2 border-solid border-black-900 sm:w-96`}
            >
                <Chats chats={chats} />
            </div>

            {children}
        </div>
    );
};

export default Sidebar;
