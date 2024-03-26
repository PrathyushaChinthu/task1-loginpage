"use client";
import { Box, Typography } from "@mui/material";
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
  const [principal, setPrincipal] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [simpleInterest, setSimpleInterest] = useState<number | null>(null);
  const [interestPerYear, setInterestPerYear] = useState<number | null>(null);
  const [interestPerMonth, setInterestPerMonth] = useState<number | null>(null);
  const [interestPerDay, setInterestPerDay] = useState<number | null>(null);

  const onSubmit = () => {
    if (!startDate || !endDate || !principal || !rate) return;

    const years = endDate.diff(startDate, "year");
    const months = endDate.diff(startDate, "month") - years * 12;
    const days = endDate.diff(startDate, "day") - (years * 365 + months * 30);

    setTimePeriod({
      years,
      months,
      days,
      remainingMonths: months,
      remainingDays: days,
    });

    const timeInYears = years + months / 12 + days / 365;
    const interest = (principal * rate * timeInYears) / 100;
    setSimpleInterest(interest);
    setInterestPerYear(interest / timeInYears);
    setInterestPerMonth(interest / (timeInYears * 12));
    setInterestPerDay(interest / (timeInYears * 365));
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
          Simple Interest Calculator
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
          <Typography color={"black"}>Principal Amount (INR):</Typography>
          <input
            type="number"
            value={principal ?? ""}
            onChange={(e) => setPrincipal(parseFloat(e.target.value))}
            style={{
              padding: "0.5rem",
              borderRadius: "10px",
            }}
          />
        </Box>
        <Box flex={"1"} padding={"0 1rem"}>
          <Typography color={"black"}>Rate of Interest (%):</Typography>
          <input
            type="number"
            value={rate ?? ""}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            style={{
              padding: "0.5rem",
              borderRadius: "10px",
            }}
          />
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
        {timePeriod && simpleInterest !== null && (
          <Box color={"white"} flex={"1"} padding={"0 1rem 1rem 1rem"}>
            <Typography>
              Time Period: {timePeriod.years} years,{" "}
              {timePeriod.remainingMonths} months, {timePeriod.remainingDays}{" "}
              days
            </Typography>
            <Typography>
              Simple Interest: {simpleInterest.toFixed(2)} INR
            </Typography>
            <Typography>
              Interest Per Year:{" "}
              {interestPerYear !== null ? interestPerYear.toFixed(2) : "N/A"}{" "}
              INR
            </Typography>
            <Typography>
              Interest Per Month:{" "}
              {interestPerMonth !== null ? interestPerMonth.toFixed(2) : "N/A"}{" "}
              INR
            </Typography>
            <Typography>
              Interest Per Day:{" "}
              {interestPerDay !== null ? interestPerDay.toFixed(2) : "N/A"} INR
            </Typography>
            <Typography>
              Total Amount: {(principal! + simpleInterest).toFixed(2)} INR
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Page;
