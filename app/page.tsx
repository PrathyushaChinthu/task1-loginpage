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
    <Container
      maxWidth="xs"
      sx={{
        backgroundImage:
          "url(https://www.moople.in/blog/wp-content/uploads/2018/02/New-Project-99.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        height={400}
        width={300}
        my={8}
        bgcolor="#0795C2"
        justifyContent="center"
        alignItems="center"
        gap={4}
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
          {/* <Link href="https://jsonplaceholder.typicode.com/posts"> */}
          <Button
            type="button"
            onClick={() => router.push("/users")}
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
}
