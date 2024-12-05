'use client';

import { useState } from "react";
import Link from "next/link";



const RegisterContainer = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const HandleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation: confirmPassword
            })
        }).catch((err) => {
            console.log(err);
        });

        console.log('login response: ', res);

        setLoading(false);

        if (res.ok) {
            const data = await res.json();
            console.log('response after ok: ', data);

        }
    }


    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-slate-200">
            <form onSubmit={HandleRegister} method="post" className="bg-white p-4">
                <h1 className="text-center text-2xl">Register</h1>
                <div className="flex flex-col gap-2">
                    <div>
                        <fieldset className="border border-slate-400 px-2 rounded">
                            <legend>
                                <label htmlFor="email">Name</label>
                            </legend>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="w-full outline-none py-1" placeholder="Enter your Name" />
                        </fieldset>
                    </div>
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
                    <div>
                        <fieldset className="border border-slate-400 px-2 rounded">
                            <legend>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </legend>
                            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" className="w-full outline-none py-1" placeholder="Confirm your password" />
                        </fieldset>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-600 text-white py-1 px-2 rounded">Register</button>
                    </div>
                </div>

            </form>


            <div className="mt-4">
                <p className="text-center">
                    Already have an account?
                    <Link href={{ pathname: "/login" }} shallow className="text-blue-600 hover:underline ml-2">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    )
};

export default RegisterContainer;