"use client";
import { Dayjs } from "dayjs";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const Date = () => {
  const [value, setValue] = useState<Dayjs | null>(null);

  return (
    <Box
      sx={{
        padding: 10,
        backgroundColor: "pink", // Set background color
        //display: "flex",
        justifyContent: "center",
        height: "100vh", // Set height to fill the viewport
      }}
    >
      <Box sx={{ padding: 10, display: "flex", justifyContent: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              sx={{ backgroundColor: "white", width: 400 }}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default Date;
