'use client';

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const Sidebar = () => {
    const { auth, logout } = useAuth();
    const [sidebar, setSidebar] = useState(true);


    return (
        <div className={`bg-gray-200 min-h-screen flex flex-col justify-between`}>
            <div className={` flex justify-between p-4`}>

                {
                    sidebar && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl font-bold">
                                    POS
                                </h1>
                            </div>

                            <ul className="space-y-2">
                                <li>
                                    <Link href={{
                                        pathname: '/'
                                    }} shallow>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href={{
                                        pathname: '/products'
                                    }} shallow>
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link href={{
                                        pathname: '/pos'
                                    }} shallow>
                                        POS
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )
                }


                <div>
                    <button onClick={() => setSidebar(!sidebar)} title="Toggle Sidebar">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
                    </button>
                </div>
            </div>


            {
                sidebar && (
                    <div className="bg-white p-4 flex items-center gap-2">
                        <Image src='/demo_user.jpg' width={1000} height={1000} alt="Image Preview" className="w-[3em] h-[3em] rounded-full border border-gray-500" />
                        <div>
                            <h3 className="font-bold text-lg">{auth?.user?.name}</h3>
                            <p className="text-sm text-gray-500">{auth?.user?.email}</p>
                        </div>
                        <div>
                            <button onClick={() => logout()} title="Logout">
                                <svg className="w-4 h-4 fill-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
                            </button>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default Sidebar;