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
export default function Home() {
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Half - Image */}
      <Grid item xs={12} sm={8}>
        <Box
          sx={{
            backgroundImage:
              "url(https://as2.ftcdn.net/v2/jpg/01/19/11/55/1000_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "left",
            height: "100%",
          }}
        />
      </Grid>

      {/* Right Half - Login Form */}
      <Grid item xs={12} sm={4}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="right"
          height="100%"
          width="100%"
          p={2}
          sx={{
            border: "2px solid grey",
          }}
        >
          <FormControl onSubmit={handleSubmit}>
            <Typography sx={{ mb: 1 }} variant="h3">
              Welcome
            </Typography>

            <FormLabel required>Email</FormLabel>
            <TextField
              sx={{ mb: 1 }}
              color="primary"
              type="email"
              name="email"
              fullWidth
              placeholder="abc@gmail.com"
              required
            />
            <FormLabel required>Password</FormLabel>
            <TextField
              color="primary"
              type="password"
              name="password"
              fullWidth
              placeholder="......"
              required
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
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
