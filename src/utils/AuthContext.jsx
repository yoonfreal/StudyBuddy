import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser } from './mockData';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     // Check if user is stored in localStorage
    //     const storedUser = localStorage.getItem('studybuddy_user');
    //     if (storedUser) {
    //         const userData = JSON.parse(storedUser);
    //         setUser(userData);
    //         setIsAuthenticated(true);
    //     }
    // }, []);
    useEffect(() => {
        const storedUser = localStorage.getItem('studybuddy_user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);

            // FORCE completed lessons here
            userData.completedLessons = [1, 2];

            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('studybuddy_user', JSON.stringify(userData));
        }
    }, []);

    const login = (email, password, role) => {
        const authenticatedUser = authenticateUser(email, password, role);

        if (authenticatedUser) {
            const userData = {
                ...authenticatedUser,
                role
            };
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('studybuddy_user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const register = (userData, role) => {
        // Mock registration - in real app, this would call an API
        const newUser = {
            id: Date.now(),
            ...userData,
            role,
            enrolledCourses: [],
            completedLessons: [],
            quizScores: [],
            certificates: []
        };

        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('studybuddy_user', JSON.stringify(newUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('studybuddy_user');
    };

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('studybuddy_user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};