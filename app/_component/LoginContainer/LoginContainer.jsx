'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/_api";
import Swal from 'sweetalert2'


const LoginContainer = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const HandleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).catch((err) => {
            console.log(err);
        });

        console.log('login response: ', res);

        setLoading(false);

        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Login successful',
                showConfirmButton: false,
                timer: 1500
            });
            const data = await res.json();
            console.log('response after ok: ', data);

            const accessToken = data.access_token;
            document.cookie = `user=${JSON.stringify({ token: accessToken })}; Path=/; Max-Age=3600; Secure; SameSite=Strict`;

            router.push('/');
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                showConfirmButton: false,
                timer: 1500
            });
        }


    }




    return (
        <section className="min-h-screen flex justify-center items-center bg-slate-200">
            <form onSubmit={HandleLogin} method="post" className="bg-white p-4">
                <h1 className="text-center text-2xl">Login</h1>
                <div className="flex flex-col gap-2">
                    <div>
                        <fieldset className="border border-slate-400 px-2 rounded">
                            <legend>
                                <label htmlFor="email">Email</label>
                            </legend>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="w-full outline-none py-1" placeholder="Enter your email" />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border border-slate-400 px-2 rounded">
                            <legend>
                                <label htmlFor="password">Password</label>
                            </legend>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="w-full outline-none py-1" placeholder="Enter your password" />
                        </fieldset>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-600 text-white py-1 px-2 rounded">
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                </div>

            </form>
        </section>
    )
};

export default LoginContainer;