"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
//import styles from './page.module.css';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Controller, useForm } from "react-hook-form";
//import Link from "next/link";

const signupSchema = z
  .object({
    firstName: z.string().min(3, "firstName is required").max(15),
    lastName: z.string().min(3, "lastName is required").max(15),
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(8, "password should be atleast 8 chars").max(12),
    gender: z.enum(["female", "male", "other"]),
    country: z.string().min(1, "Country is required"),
  })
  .required();

type Props = {};

const SignupPage = (props: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setGender((event.target as HTMLInputElement).value);
  // };

  const handleChangeCountry = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  console.log(errors);
  // const toggleDialog = () => {
  //   setOpen(!open);
  // };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="right"
      height="100%"
      width="90%"
      p={2}
      sx={{
        border: "2px solid grey",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography sx={{ mb: 1 }} variant="h5">
        Welcome
      </Typography>

      <TextField
        sx={{ mb: 1 }}
        {...register("firstName")}
        color="primary"
        type="string"
        name="firstName"
        fullWidth
        placeholder="John"
        label="First name"
        helperText={errors?.firstName?.message as any}
        error={Boolean(errors?.firstName?.message)}
      />
      <TextField
        sx={{ mb: 1 }}
        {...register("lastName")}
        color="primary"
        type="string"
        name="lastName"
        fullWidth
        placeholder="Williams"
        label="Last name"
        helperText={errors?.lastName?.message as any}
        error={Boolean(errors?.lastName?.message)}
      />
      <TextField
        sx={{ mb: 1 }}
        {...register("email")}
        color="primary"
        type="email"
        name="email"
        fullWidth
        placeholder="abc@gmail.com"
        label="Email"
        helperText={errors?.email?.message as any}
        error={Boolean(errors?.email?.message)}
      />
      <TextField
        color="primary"
        {...register("password")}
        type="password"
        name="password"
        fullWidth
        placeholder="......"
        label="Password"
        helperText={errors?.password?.message as any}
        error={Boolean(errors?.password?.message)}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <FormLabel id="gender-group-label">Gender</FormLabel>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          )}
        />
        {errors.gender && (
          <Typography variant="body2" color="error">
            {errors?.gender?.message as any}
          </Typography>
        )}
      </FormControl>

      <FormControl>
        <InputLabel id="select-label">Country</InputLabel>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              // labelId="select-label"
              // id="simple-select"
              // value={country}
              label="country"
              // onChange={handleChangeCountry}
              //{...register("country")}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Austria">Austria</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
              <MenuItem value="Us">Us</MenuItem>
              <MenuItem value="Uk">Uk</MenuItem>
              <MenuItem value="India">India</MenuItem>
            </Select>
          )}
        />
        {errors.country && (
          <Typography variant="body2" color="error">
            {errors?.country?.message as any}
          </Typography>
        )}
      </FormControl>
      <Button
        type="submit"
        style={{ backgroundColor: "#378CE7", flex: "1" }}
        sx={{ mt: 2 }}
        color="primary"
        variant="contained"
      >
        Create account
      </Button>
      <Box sx={{ color: "red" }}></Box>
    </Box>
  );
};
export default SignupPage;
