"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEventHandler, useState } from "react";

export function Credentials() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isError, setIsError] = useState<boolean>(false);

    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        });

        if (result && !result.error) {
            router.push(searchParams.get("callbackUrl") || "/");
        } else {
            setIsError(true);
        }
    };

    return (
        <div>
            <form
                onSubmit={submitHandler}
                className="flex flex-col gap-5 sm:min-w-96 p-3"
            >
                <label className="text-sm">
                    Username
                    <input
                        className={`block w-full h-8 p-2 outline-none rounded-sm  focus:bg-white transition-colors 
                        duration-300 ease-in-out bg-gray-200/90 inputAutofill
                        ${
                            isError
                                ? "border-2 border-solid border-red-500/60"
                                : "focus:border-solid focus:border-gray-400/50 focus:border"
                        }`}
                        type="username"
                        name="username"
                        required
                        onChange={() => setIsError(false)}
                    />
                </label>

                <label className="text-sm">
                    Пароль
                    <input
                        className={`block w-full h-8 p-2 outline-none rounded-sm focus:bg-white transition-colors 
                        duration-300 ease-in-out bg-gray-200/90 inputAutofill
                        ${
                            isError
                                ? "border-2 border-solid border-red-500/60"
                                : "focus:border-solid focus:border-gray-400/50 focus:border"
                        }`}
                        type="password"
                        name="password"
                        required
                        onChange={() => setIsError(false)}
                    />
                </label>

                <button
                    type="submit"
                    className="w-30 py-3 px-5 bg-blue-500/70 border border-solid border-gray-400/50 
                    rounded-md text-xl w-min text-white hover:bg-blue-500/60 active:bg-blue-500/50 m-auto"
                >
                    Войти
                </button>
                <h2 className="text-red-500 h-6 text-center">
                    {isError && "Неверный логин или пароль"}
                </h2>
            </form>
        </div>
    );
}
