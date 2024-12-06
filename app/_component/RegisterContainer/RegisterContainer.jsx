'use client';

import { useState } from "react";
import Link from "next/link";
import { register } from "@/app/_api";
import Swal from "sweetalert2";



const RegisterContainer = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const HandleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);


        const res = await register({ name, email, password, password_confirmation: confirmPassword }).catch((err) => console.log(err));

        if (res.status) {
            Swal.fire({
                icon: "success",
                title: res.message,
                showConfirmButton: true,
                timer: 1500,
            });
        } else {
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            Swal.fire({
                icon: "error",
                title: res.message.email,
                showConfirmButton: false,
                timer: 1500,
            });
        }

        setLoading(false);
    }


    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-slate-200">
            <form onSubmit={HandleRegister} method="post" className="bg-white p-4 rounded min-w-[20em]">
                <h1 className="text-center text-2xl">Register</h1>
                <div className="flex flex-col gap-2">
                    <div>
                        <fieldset className="border border-slate-400 px-2 rounded">
                            <legend>
                                <label htmlFor="email" className="text-sm bg-white px-1 after:content-['_*'] after:text-red-600">Name</label>
                            </legend>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="w-full outline-none py-1" placeholder="Enter your Name" required />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border border-slate-400 px-2 rounded">
                            <legend>
                                <label htmlFor="email" className="text-sm bg-white px-1 after:content-['_*'] after:text-red-600">Email</label>
                            </legend>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="w-full outline-none py-1" placeholder="Enter your email" required />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border border-slate-400 px-2 rounded">
                            <legend>
                                <label htmlFor="password" className="text-sm bg-white px-1 after:content-['_*'] after:text-red-600">Password</label>
                            </legend>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="w-full outline-none py-1" placeholder="Enter your password" required />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border border-slate-400 px-2 rounded">
                            <legend>
                                <label htmlFor="confirmPassword" className="text-sm bg-white px-1 after:content-['_*'] after:text-red-600">Confirm Password</label>
                            </legend>
                            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" className="w-full outline-none py-1" placeholder="Confirm your password" required />
                        </fieldset>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-sm"><span className="text-red-600">*</span> Required</p>
                        <button disabled={loading} type="submit" className={`bg-blue-600 text-white py-1 px-2 rounded ${loading ? 'cursor-not-allowed opacity-50' : ''}`}>
                            {
                                loading ? 'Loading...' : 'Register'
                            }
                        </button>
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