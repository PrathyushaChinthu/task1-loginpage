"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Box,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import TimeSection from "./TimeSection";

// Define Zod schema for the form data
const schema = z.object({
  timeZone: z.string().nonempty(),
});

const IndexPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      timeZone: "UTC",
    },
  });
  const [currentTime, setCurrentTime] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const fetchCurrentTime = async (timeZone: any) => {
    try {
      const response = await fetch(
        `https://worldtimeapi.org/api/timezone/${timeZone}`
      );
      const data = await response.json();
      setCurrentTime(data.datetime);
    } catch (error) {
      console.error("Error fetching current time:", error);
    }
  };

  useEffect(() => {
    fetchCurrentTime("UTC"); // Fetch initial time zone data
  }, []);

  const onSubmit = (data: any) => {
    setSelectedTime(data.timeZone);
    fetchCurrentTime(data.timeZone); // Fetch current time based on selected time zone
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h3" align="center" gutterBottom>
            World Clock
          </Typography>
          <TimeSection title="Current Time" time={currentTime} />
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <FormControl>
                <InputLabel id="select-label">Country</InputLabel>
                <Controller
                  name="timeZone"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Select Time Zone"
                      variant="outlined"
                      error={Boolean(errors.timeZone)}
                      //helperText={(errors.timeZone?.message || "") as any}
                    >
                      <MenuItem value="UTC">UTC</MenuItem>
                      <MenuItem value="America/New_York">
                        America/New_York
                      </MenuItem>
                      <MenuItem value="Europe/London">Europe/London</MenuItem>
                      <MenuItem value="Asia/Tokyo">Asia/Tokyo</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
          {selectedTime && (
            <TimeSection title="Selected Time" time={currentTime} />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default IndexPage;
