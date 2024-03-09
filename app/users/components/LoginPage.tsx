"use client";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email == "") {
      setEmailError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }

    if (email && password) {
      console.log(email, password);
    }
  };
  return (
    <Container maxWidth="xs">
      <Box
        height={300}
        width={250}
        my={8}
        bgcolor="#0795C2"
        justifyContent="center"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: "2px solid grey" }}
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
          ></TextField>
          <FormLabel required>Password</FormLabel>
          <TextField
            color="primary"
            type="password"
            value={password}
            error={passwordError}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          ></TextField>
          <Button
            type="submit"
            sx={{ mt: 2 }}
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};
export default LoginPage;
