'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const toast = useToast()
    const [users, setUsers] = useState([]);
    const [authenticatedUser, setAuthenticatedUser] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    const fetchAllUser = async (access_Token) => {
        const response = await fetch('api/assignment.jsp?cmd=get_customer_list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_Token}`,
            },
            credentials: "include",
        });

        const res = await response.json();
        setUsers(res)
    }

    const handleEditUser = (_uuid, data) => {
        setUsers(prev => {
            return prev.map((users_) => {
                if (users_.uuid === _uuid) return { ...users_, ...data }
                return users_
            })
        });
    };

    const handleDelete = async (_uuid) => {
        setUsers(prev => {
            return prev.filter((users_) => {
                return (users_.uuid !== _uuid)
            })
        });

        const response = await fetch(`api/assignment.jsp?cmd=delete&uuid=${_uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: "include",
        });

        const res = await response.json();

        console.warn("delete res :: ", res);
    };

    const handleAddUser = (data) => {
        setUsers(prev => {
            return [
                ...prev,
                data
            ]
        })
    }

    const successToast = (title) => {
        toast({
            title: title,
            status: 'success',
            duration: 9000,
            isClosable: true,
        });
    }
    const errorToast = (title) => {
        toast({
            title: title,
            status: 'error',
            duration: 4000,
            isClosable: true,
        });
    }

    return (
        <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser, successToast, errorToast, setAccessToken, accessToken, setUsers, users, handleEditUser, handleDelete, fetchAllUser, handleAddUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
