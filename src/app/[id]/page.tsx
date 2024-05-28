import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Telegram Clone",
    description: "Telegram Clone",
};

export default function Home() {
    return (
        <div className="h-screen w-full flex justify-center items-center ">
            <div className="p-2 rounded-3xl bg-gray-300/30 text-x">
                Выберите, кому хотели бы написать
            </div>
        </div>
    );
}
