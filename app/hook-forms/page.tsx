"use client";

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
} from "@mui/material";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
type Props = {};
const Home = (props: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = React.useState(0);
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
                <Box>
                  <SignupPage />
                </Box>
              )}
              {tabValue === 1 && (
                <Box>
                  <LoginPage />
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
