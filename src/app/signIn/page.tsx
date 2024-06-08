"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function SignIn() {
    const router = useRouter();

    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (result && !result.error) {
            router.push("/");
        } else {
            console.error(result?.error);
        }
    };

    return (
        <div>
            <h1>Авторизация</h1>
            <form onSubmit={submitHandler}>
                <input type="email" name="email" required />
                <input type="password" name="password" required />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
}
