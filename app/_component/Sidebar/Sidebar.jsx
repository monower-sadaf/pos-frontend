'use client';

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
    const { auth, logout } = useAuth();


    return (
        <div className="bg-gray-200 min-w-60 p-4">
            <h1 className="text-xl font-bold mb-4">
                {auth?.user?.name}
            </h1>

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
    );
};

export default Sidebar;