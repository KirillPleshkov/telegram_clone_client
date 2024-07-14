import Sidebar from "@/components/Sidebar/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Telegram Clone",
    description: "Telegram Clone",
};

export default async function Home() {
    return (
        <Sidebar>
            <div className="hidden justify-center items-center w-[calc(100vw-24rem)] h-full sm:flex">
                <div className="p-2 rounded-3xl bg-gray-300/30 text-x">
                    Выберите, кому хотели бы написать
                </div>
            </div>
        </Sidebar>
    );
}
