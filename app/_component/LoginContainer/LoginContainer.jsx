'use client';

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { login } from "@/app/_api";
import Swal from "sweetalert2";
import Link from "next/link";

const LoginContainer = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login: setAuth } = useAuth();

    const HandleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await login({ email, password });

            if (res.status === true) {
                Swal.fire({
                    icon: "success",
                    title: res.message,
                    showConfirmButton: true,
                    timer: 1500,
                });

                const data = res.data;
                const accessToken = data.access_token;

                setAuth(data.user, accessToken);
                
                login(data.user, accessToken);

            } else {
                Swal.fire({
                    icon: "error",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Login Error:", error);
            Swal.fire({
                icon: "error",
                title: "An error occurred. Please try again.",
                showConfirmButton: false,
                timer: 1500,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-slate-200">
            <form onSubmit={HandleLogin} method="post" className="bg-white p-4">
                <h1 className="text-center text-2xl">Login</h1>
                <div className="flex flex-col gap-2">
                    <div>
                        <fieldset className="border border-slate-400 px-2 rounded">
                            <legend>
                                <label htmlFor="email">Email</label>
                            </legend>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                className="w-full outline-none py-1"
                                placeholder="Enter your email"
                            />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border border-slate-400 px-2 rounded">
                            <legend>
                                <label htmlFor="password">Password</label>
                            </legend>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                className="w-full outline-none py-1"
                                placeholder="Enter your password"
                            />
                        </fieldset>
                    </div>

                    <div className="flex justify-end">
                        <button
                            disabled={loading}
                            type="submit"
                            className={`bg-blue-600 text-white py-1 px-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </div>
                </div>
            </form>

            <div className="mt-4">
                <p>
                    Don't have an account?
                    <Link href={{ pathname: "/register" }} shallow className="text-blue-600 ml-2">
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default LoginContainer;