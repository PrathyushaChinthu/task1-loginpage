"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField, Typography } from "@mui/material";

// Define Zod schema for the form data
const interestSchema = z.object({
  principal: z.coerce.number().positive(),
  rate: z.coerce.number().positive(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

const SimpleInterestCalculator = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(interestSchema),
  });

  const [interestResult, setInterestResult] = useState<number | null>(null);
  const [totalResult, setTotalResult] = useState<number | null>(null);
  const onSubmit = (data: any) => {
    // Calculate time difference in milliseconds
    const timeDifferenceMs =
      new Date(data.endDate).getTime() - new Date(data.startDate).getTime();
    // Convert time difference to years
    const time = timeDifferenceMs / (1000 * 60 * 60 * 24 * 365);

    // Calculate simple interest
    const interest = (data.principal * data.rate * time) / 100;
    setInterestResult(interest);
    // Calculate total amount
    const total = data.principal + interest;
    setTotalResult(total);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        height: "100vh",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
          <Controller
            name="principal"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="principal"
                label="Principal Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors?.principal)}
                helperText={(errors?.principal?.message || "") as any}
              />
            )}
          />
        </Box>
        <Box flex={"1"} padding={"0 1rem"}>
          <Controller
            name="rate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="rate"
                label="Rate of Interest (%)"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors?.rate)}
                helperText={(errors?.rate?.message || "") as any}
              />
            )}
          />
        </Box>
        <Box flex={"1"} padding={"0 1rem"}>
          <Controller
            name="startDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="startDate"
                label="Start Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors?.startDate)}
                helperText={(errors?.startDate?.message || "") as any}
              />
            )}
          />
        </Box>
        <Box flex={"1"} padding={"0 1rem"}>
          <Controller
            name="endDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="endDate"
                label="End Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors?.endDate)}
                helperText={(errors?.endDate?.message || "") as any}
              />
            )}
          />
        </Box>
        {interestResult !== null && (
          <Box mt={2} bgcolor="white" p={2}>
            <Typography variant="body1">
              Simple Interest: {interestResult}
            </Typography>
          </Box>
        )}
        {totalResult !== null && (
          <Box mt={2} bgcolor="white" p={2}>
            <Typography variant="body1">Total Amount: {totalResult}</Typography>
          </Box>
        )}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Calculate
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SimpleInterestCalculator;
