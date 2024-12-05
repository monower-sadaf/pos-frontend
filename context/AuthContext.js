'use client';

import { createContext, useContext, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: null,
    });

    // Function to update auth state
    const login = (user, token) => {
        setAuth({ user, token });
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
