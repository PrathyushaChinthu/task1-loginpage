"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (email && password) {
      console.log(email, password);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Half - Image */}
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            backgroundImage:
              "url(https://www.moople.in/blog/wp-content/uploads/2018/02/New-Project-99.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "left",
            height: "100%",
          }}
        />
      </Grid>

      {/* Right Half - Login Form */}
      <Grid item xs={12} sm={6}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          p={2}
          sx={{
            border: "2px solid grey",
          }}
        >
          <FormControl onSubmit={handleSubmit}>
            <Typography sx={{ mb: 1 }} variant="h4">
              Welcome
            </Typography>
            <FormLabel required>Email</FormLabel>
            <TextField
              sx={{ mb: 1 }}
              color="primary"
              type="email"
              fullWidth
              value={email}
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormLabel required>Password</FormLabel>
            <TextField
              color="primary"
              type="password"
              value={password}
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button
              type="button"
              onClick={() => router.push("/age-calculator")}
              //onClick={() => router.push("/hook-forms")}
              style={{ backgroundColor: "#378CE7", flex: "1" }}
              sx={{ mt: 2 }}
              color="primary"
              variant="contained"
            >
              Login
            </Button>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
