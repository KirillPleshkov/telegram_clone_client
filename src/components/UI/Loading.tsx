import "@/styles/globals.css";

export default function Loading() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-300/40">
            <div className="w-20 h-20 border-4 border-solid border-gray-500 border-b-transparent rounded-full loader-anim"></div>
        </div>
    );
}
