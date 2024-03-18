"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
//import styles from './page.module.css';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tabs,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
//import Link from "next/link";
const loginSchema = z
  .object({
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(8, "password should be atleast 8 chars").max(12),
  })
  .required();
const LoginPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  console.log(errors);
  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="right"
      height="100%"
      width="90%"
      p={2}
      sx={{
        border: "2px solid grey",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography sx={{ mb: 1 }} variant="h5">
        Welcome Back
      </Typography>

      <TextField
        sx={{ mb: 1 }}
        {...register("email")}
        color="primary"
        type="email"
        name="email"
        fullWidth
        placeholder="abc@gmail.com"
        label="Email"
        helperText={errors?.email?.message as any}
        error={Boolean(errors?.email?.message)}
      />
      <TextField
        color="primary"
        {...register("password")}
        type="password"
        name="password"
        fullWidth
        placeholder="......"
        label="Password"
        helperText={errors?.password?.message as any}
        error={Boolean(errors?.password?.message)}
      />
      <Button
        type="submit"
        style={{ backgroundColor: "#378CE7", flex: "1" }}
        sx={{ mt: 2 }}
        color="primary"
        variant="contained"
      >
        LOGIN
      </Button>
      <Box sx={{ color: "red" }}></Box>
    </Box>
  );
};
export default LoginPage;
