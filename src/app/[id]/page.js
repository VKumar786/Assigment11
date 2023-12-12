"use client"
import React, { useEffect } from 'react'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';

const EditUserPersonal = ({ params }) => {
  const router = useRouter()
  const { users, accessToken, handleEditUser, successToast, errorToast } = useAuth()
  let initialValues = {
    first_name: '',
    last_name: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: '',
  };

  users.map((user) => {
    if (params.id === user.uuid) {
      initialValues = user
    }
  })

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(`api/assignment.jsp?cmd=update&uuid=${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
          street: values.street,
          address: values.address,
          city: values.city,
          state: values.state,
          email: values.email,
          phone: values.phone,
        }),
        credentials: "include",
      });

      if (res.status === 200) {

        handleEditUser(params.id, values);
        successToast("Customer Updated Successfully");

        router.push("/")
      } else {
        errorToast("Please fill correct credential")
      }

      resetForm();
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  return (
    <Box margin={"5rem auto"} maxW={"7xl"} padding={4}>
      <Heading margin={"0 0 1rem 0"}>Edit Customer Details</Heading>
      <form onSubmit={formik.handleSubmit}>
        <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gridGap={4}>
          <FormControl isInvalid={formik.touched.first_name && formik.errors.first_name}>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              placeholder='First Name'
            />
            <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.last_name && formik.errors.last_name} >
            <Input
              id="last_name"
              name="last_name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              placeholder='Last Name'
            />
            <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.street && formik.errors.street} >
            <Input
              id="street"
              name="street"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.street}
              placeholder='Street'
            />
            <FormErrorMessage>{formik.errors.street}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.address && formik.errors.address} >
            <Input
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              placeholder='Address'
            />
            <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.city && formik.errors.city} >
            <Input
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              placeholder='City'
            />
            <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.state && formik.errors.state} >
            <Input
              id="state"
              name="state"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
              placeholder='State'
            />
            <FormErrorMessage>{formik.errors.state}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.email && formik.errors.email} >
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder='Email'
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.phone && formik.errors.phone} >
            <Input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder='Phone'
            />
            <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box display={"flex"} flexDir={"row-reverse"}>
          <Button
            type="submit"
            colorScheme="blue"
            mt={4}
            isLoading={formik.isSubmitting}
            disabled={!formik.isValid}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default EditUserPersonal