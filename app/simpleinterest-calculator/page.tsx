"use client";
import { Box, Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import React, { useState } from "react";

type TimePeriod = {
  years: number;
  months: number;
  days: number;
  remainingMonths: number;
  remainingDays: number;
};

const Page = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod | null>(null);

  const onSubmit = () => {
    if (!startDate || !endDate) return;

    const years = endDate.diff(startDate, "year");
    const months = endDate.diff(startDate, "month");
    const remainingMonths = months - years * 12;
    const days = endDate.diff(startDate, "day");
    const remainingDays = days - years * 365;

    setTimePeriod({
      years,
      months,
      days,
      remainingMonths,
      remainingDays,
    });
  };

  return (
    <Box
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ backgroundColor: "black" }}
    >
      <Box
        width={"50%"}
        border={"5px solid black"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={"1rem"}
        sx={{ backgroundColor: "#37e4e7" }}
      >
        <Box
          sx={{ backgroundColor: "#e7376f" }}
          width={"100%"}
          padding={"1rem 0"}
          textAlign={"center"}
          fontSize={"2.5rem"}
          fontWeight={"600"}
        >
          Simple Interest
        </Box>
        <Box flex={"1"} padding={"0 1rem"}>
          <Typography color={"black"}>Start Date:</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                sx={{
                  backgroundColor: "whitesmoke",
                  borderRadius: "10px",
                }}
                value={startDate}
                onChange={(newStartDate) => {
                  setStartDate(newStartDate);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box flex={"1"} padding={"0 1rem"}>
          <Typography color={"black"}>End Date:</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                sx={{
                  backgroundColor: "whitesmoke",
                  borderRadius: "10px",
                }}
                value={endDate}
                onChange={(newEndDate) => {
                  setEndDate(newEndDate);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box flex={"1"} padding={"0 1rem"}>
          <button
            onClick={onSubmit}
            style={{
              backgroundColor: "#124076",
              color: "white",
              padding: "1rem",
              borderRadius: "1rem",
            }}
          >
            Calculate
          </button>
        </Box>
        {timePeriod && (
          <Box color={"white"} flex={"1"} padding={"0 1rem 1rem 1rem"}>
            Age:
            <Typography>
              {timePeriod.years} years and {timePeriod.remainingMonths} months
              and
              {timePeriod.remainingDays} days
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Page;
