"use client"
import React, { useEffect } from 'react'
import { useAuth } from './AuthContext';
import { redirect, useRouter } from 'next/navigation'
import LoginForm from './login/page';
import UserTable from './components/UserTable';
import { Box, Button, Heading } from '@chakra-ui/react';

const Home = () => {
  const router = useRouter()
  const { authenticatedUser } = useAuth();

  useEffect(() => {
    console.warn("authenticatedUser::", authenticatedUser);
    if (!authenticatedUser) redirect("/login")
  }, [authenticatedUser]);

  return (
    <Box margin={"5rem auto"} maxW={"7xl"}>
      <Box borderBottom={"2px solid #000"} margin={"0 0 1rem 0"} position={"relative"} padding={"0.25rem"}>
        <Button
          position={"absolute"}
          top={0}
          colorScheme={"blue"}
          left={0}
          onClick={() => {
            router.push("/add-user")
          }}>
          Add Customer
        </Button>

        <Heading textAlign={"center"}>Customer List</Heading>
      </Box>
      <UserTable />
    </Box>
  )
}

export default Home