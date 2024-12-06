'use client';

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
    const { auth, logout } = useAuth();
    const [sidebar, setSidebar] = useState(true);


    return (
        <div className={`bg-gray-200  p-4 flex min-h-screen`}>
            <div className={`min-w-20 lg:min-w-36 ${sidebar ? 'block' : 'hidden'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">
                        {auth?.user?.name}
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
                    <li>
                        <button
                            onClick={() => logout()}
                            className="text-red-500 hover:underline"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

            <div>
                <button onClick={() => setSidebar(!sidebar)} title="Toggle Sidebar">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;