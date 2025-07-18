import React, { createContext, useState, useContext, useEffect } from "react";
import { getMe } from "../api/auth";

type AuthContextType = {
    user: any;
    setUser: (user: any) => void
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await getMe();
                console.log(res.data);
                
                setUser(res.data.user);
                setIsAuthenticated(true)
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false)
                console.log(error)
            } finally {
                setLoading(false)
            }
        };

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
