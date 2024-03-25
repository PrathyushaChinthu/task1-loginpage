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
  time: z.coerce.number().positive(),
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
    // Parse the input values to numbers
    const principal = parseFloat(data.principal);
    const rate = parseFloat(data.rate);
    const time = parseFloat(data.time);

    // Check if the parsed values are valid numbers
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
      // Handle invalid input
      // For example, you can set an error message or return early
      return;
    }

    // Calculate simple interest
    const interest = (principal * rate * time) / 100;
    setInterestResult(interest);
    // Calculate total amount
    const total = principal + interest;
    setTotalResult(total);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        height: "100vh",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box sx={{ backgroundColor: "white", p: 4 }}>
        <Typography sx={{ mb: 3 }} variant="h5">
          Simple Interest Calculator
        </Typography>
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
        <Controller
          name="time"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="time"
              label="Time (in years)"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors?.time)}
              helperText={(errors?.time?.message || "") as any}
            />
          )}
        />
        {interestResult !== null && (
          <Box mt={2} bgcolor="lightgray" p={2}>
            <Typography variant="body1">
              Simple Interest: {interestResult}
            </Typography>
          </Box>
        )}
        {totalResult !== null && (
          <Box mt={2} bgcolor="lightgray" p={2}>
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
