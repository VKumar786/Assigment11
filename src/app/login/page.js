"use client"
import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useAuth } from '../AuthContext';
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const router = useRouter()
    const { successToast, errorToast, setAuthenticatedUser, setAccessToken, fetchAllUser } = useAuth()
    const formik = useFormik({
        initialValues: {
            login_id: '',
            password: '',
        },
        validationSchema: Yup.object({
            login_id: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await fetch('api/assignment_auth.jsp', {
                    method: 'POST',
                    body: JSON.stringify({
                        login_id: values.login_id,
                        password: values.password,
                    }),
                    credentials: "include",
                });

                const res = await response.json();


                console.log('API Response:', res);
                if (response.status === 200) {
                    // 'Login Successfully.'
                    fetchAllUser(res.access_token)
                    setAuthenticatedUser(true);
                    // access_token
                    setAccessToken(res.access_token);
                    successToast("Login Successfully");

                    // setTimeout(() => {
                    router.push("/")
                    // }, 5000);
                } else {
                    // 'Please fill correct credential.'
                    errorToast("Please fill correct credential")
                }

                resetForm();
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} minH={"100vh"}>
            <VStack spacing={4} align="stretch">
                <form onSubmit={formik.handleSubmit}>
                    <FormControl isInvalid={formik.touched.login_id && formik.errors.login_id}>
                        <FormLabel htmlFor="login_id">Login ID:</FormLabel>
                        <Input
                            type="text"
                            id="login_id"
                            name="login_id"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.login_id}
                        />
                        <FormErrorMessage>{formik.errors.login_id}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.touched.password && formik.errors.password}>
                        <FormLabel htmlFor="password">Password:</FormLabel>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>

                    <Button type="submit" colorScheme="blue" isLoading={formik.isSubmitting} margin={"0.5rem 0 0 0"}>
                        Submit
                    </Button>
                </form>
            </VStack>
        </Box>
    );
};

export default LoginForm;
