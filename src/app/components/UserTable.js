"use client"
import React, { useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box, Heading } from '@chakra-ui/react';
import { useAuth } from '../AuthContext';
import { GrSubtractCircle } from "react-icons/gr";
import { IoPencilSharp } from "react-icons/io5";

import { useRouter } from 'next/navigation'

const UserTable = () => {
    const router = useRouter()
    const { users, handleDelete } = useAuth()

    useEffect(() => {
        console.warn("users :: ", users);
    }, [users])

    return (
        <Table variant="simple">
           
            <Thead>
                <Tr>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    {/* <Th>Street</Th> */}
                    <Th>Address</Th>
                    <Th>City</Th>
                    <Th>State</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.length > 0 && users.map((user, index) => {
                    const { uuid, first_name, last_name, street, address, city, state, email, phone } = user
                    return <Tr key={index}>
                        <Td>{first_name}</Td>
                        <Td>{last_name}</Td>
                        {/* <Td>{street}</Td> */}
                        <Td>{address}</Td>
                        <Td>{city}</Td>
                        <Td>{state}</Td>
                        <Td>{email}</Td>
                        <Td>{phone}</Td>
                        <Td display={"flex"} gap={4}>
                            <GrSubtractCircle style={{ background: "red", color: "white", borderRadius: "50%", fontSize: "20px", cursor: "pointer" }} onClick={() => handleDelete(uuid)} />
                            <IoPencilSharp style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => {
                                router.push(`/${uuid}`)
                            }} />
                        </Td>
                    </Tr>
                })}
            </Tbody>
        </Table>
    );
};

export default UserTable;
