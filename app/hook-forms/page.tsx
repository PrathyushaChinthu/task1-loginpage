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
import Link from "next/link";
const signupSchema = z
  .object({
    firstName: z.string().min(3, "firstName is required").max(15),
    lastName: z.string().min(3, "lastName is required").max(15),
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(8, "password should be atleast 8 chars").max(12),
  })
  .required();
const loginSchema = z
  .object({
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(8, "password should be atleast 8 chars").max(12),
  })
  .required();
type Props = {};
const Home = (props: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tabValue === 0 ? signupSchema : loginSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  console.log(errors);
  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Box sx={{ height: "90vh", display: "flex", flexDirection: "column" }}>
      {/* Button on Top */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="10%"
        width="100%"
      >
        <Button
          sx={{ width: "100%" }}
          variant="contained"
          onClick={toggleDialog}
        >
          EXPLORE
        </Button>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Grid container sx={{ height: "100vh" }}>
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundImage:
                  "url(https://as2.ftcdn.net/v2/jpg/01/19/11/55/1000_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
                width: "100%",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        sx={{ mb: 2 }}
      >
        <Dialog open={open} fullWidth onClose={toggleDialog}>
          <DialogTitle
            sx={{ color: "green", fontSize: "24px", fontWeight: "bold" }}
          >
            UPLABS
          </DialogTitle>
          <DialogContent>
            <Box>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Signup" />
                <Tab label="Login" />
              </Tabs>
              {tabValue === 0 && (
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
                    Welcome
                  </Typography>

                  <TextField
                    sx={{ mb: 1 }}
                    {...register("firstName")}
                    color="primary"
                    type="string"
                    name="firstName"
                    fullWidth
                    placeholder="John"
                    label="First name"
                    helperText={errors?.firstName?.message as any}
                    error={Boolean(errors?.firstName?.message)}
                  />
                  <TextField
                    sx={{ mb: 1 }}
                    {...register("lastName")}
                    color="primary"
                    type="string"
                    name="lastName"
                    fullWidth
                    placeholder="Williams"
                    label="Last name"
                    helperText={errors?.lastName?.message as any}
                    error={Boolean(errors?.lastName?.message)}
                  />
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
                    Create account
                  </Button>
                  <Box sx={{ color: "red" }}></Box>
                </Box>
              )}
              {tabValue === 1 && (
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
                    Login
                  </Button>
                  <Box sx={{ color: "red" }}></Box>
                </Box>
              )}
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};
export default Home;
