'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

const Sidebar = () => {
    const router = useRouter();

    const HandleLogout = () => {
        // Delete the "user" cookie
        document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        // Redirect to the login page
        // router.push("/login");
        window.location.href = "/login";
    };

    return (
        <div className="bg-gray-200 min-w-60 p-4">
            <h1 className="text-xl font-bold mb-4">Sidebar</h1>

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
                        onClick={HandleLogout}
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
