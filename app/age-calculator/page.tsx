"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField, Typography } from "@mui/material";

// Define Zod schema for the form data
const ageSchema = z.object({
  dateOfBirth: z.coerce.date(),
  ageAtTheDateOf: z.coerce.date(),
});

const AgeCalculator = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ageSchema),
  });

  const [ageResult, setAgeResult] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    const dob = new Date(data.dateOfBirth);
    const ado = new Date(data.ageAtTheDateOf);

    // Calculate age difference in milliseconds
    const ageDifference = ado.getTime() - dob.getTime();

    const years = Math.floor(ageDifference / (1000 * 60 * 60 * 24 * 365.25));
    const remainingMilliseconds =
      ageDifference - years * (1000 * 60 * 60 * 24 * 365.25);

    const months = Math.floor(
      remainingMilliseconds / ((1000 * 60 * 60 * 24 * 365.25) / 12)
    );
    const remainingDays = Math.floor(
      (remainingMilliseconds % ((1000 * 60 * 60 * 24 * 365.25) / 12)) /
        (1000 * 60 * 60 * 24)
    );

    const result = `${years} years, ${months} months, ${remainingDays} days`;
    setAgeResult(result);
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
          Age Calculator
        </Typography>
        <Controller
          name="dateOfBirth"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="dateOfBirth"
              label="Date of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors?.dateOfBirth)}
              helperText={(errors?.dateOfBirth?.message || "") as any}
            />
          )}
        />
        <Controller
          name="ageAtTheDateOf"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="ageAtTheDateOf"
              label="Age at the Date of"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors?.secondDate)}
              helperText={(errors?.secondDate?.message || "") as any}
            />
          )}
        />
        {ageResult && (
          <Box mt={2} bgcolor="lightgray" p={2}>
            <Typography variant="body1">Your age is: {ageResult}</Typography>
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

export default AgeCalculator;
