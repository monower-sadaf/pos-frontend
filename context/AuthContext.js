'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Helper function to get cookies
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [auth, setAuth] = useState({
        user: null,
        token: null,
    });

    // Check cookies for auth data on mount
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

        // Store in cookies for persistence
        document.cookie = `user=${JSON.stringify({ token, user })}; Path=/; Max-Age=3600; Secure; SameSite=Strict`;

        // Redirect to dashboard page
        router.push('/');
    };

    const logout = () => {
        setAuth({ user: null, token: null });
        document.cookie = `user=; Path=/; Max-Age=0; Secure; SameSite=Strict`; // Clear cookie

        // Redirect to login page
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
