'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { logoutUser } from "@/app/_api";


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};


export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [auth, setAuth] = useState({
        user: null,
        token: null,
    });

    useEffect(() => {
        const storedUser = getCookie('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setAuth({
                user: parsedUser.user,
                token: parsedUser.token,
            });
        }
    }, []);

    // Function to update auth state
    const login = (user, token) => {
        setAuth({ user, token });

        document.cookie = `user=${JSON.stringify({ token, user })}; Path=/; Max-Age=3600; Secure; SameSite=Strict`;

        router.push('/');
    };

    const logout = async () => {

        const response = await logoutUser(auth.token).catch((err) => console.log(err));

        if (!response?.status) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to logout',
            });
        } else {

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Logout successful',
            });

            setAuth({ user: null, token: null });
            document.cookie = `user=; Path=/; Max-Age=0; Secure; SameSite=Strict`;

            window.location.href = '/login';
        }
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
