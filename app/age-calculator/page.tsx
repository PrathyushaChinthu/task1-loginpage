"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField, Typography } from "@mui/material";

// Define Zod schema for the form data
const ageSchema = z.object({
  dateOfBirth: z.coerce.date(),
});

const AgeCalculator = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ageSchema),
  });

  const onSubmit = (data: any) => {
    const dob = new Date(data.dateOfBirth);
    const now = new Date();

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    // Adjust for leap year if current month and day are before birth month and day
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    // Adjust days if current day is before birth day
    if (days < 0) {
      const tempDate = new Date(now.getFullYear(), now.getMonth(), 0);
      days += tempDate.getDate();
      months--;
    }

    const result = `${years} years ${months} months ${days} days`;
    alert(`Your age is: ${result}`);
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
          Welcome
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
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Calculate Age
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AgeCalculator;

// "use client";
// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

// // Define Zod schema for the form data
// const ageSchema = z.object({
//   dateOfBirth: z.coerce.date(),
//   //country: z.string().min(1, "Country is required"),
// });
// type Age = z.infer<typeof ageSchema>;

// const AgeCalculator = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(ageSchema),
//   });

//   const onSubmit = (data: any) => {
//     // Ensure data.dateOfBirth is a Date object
//     const dob = new Date(data.dateOfBirth);
//     if (isNaN(dob.getTime())) {
//       alert("Please enter a valid date of birth.");
//       return;
//     }

//     // Handle the calculation
//     const now = new Date();
//     const age = now.getFullYear() - dob.getFullYear();
//     alert(`Your age is: ${age}`);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         name="dateOfBirth"
//         control={control}
//         defaultValue=""
//         render={({ field }) => (
//           <TextField
//             {...field}
//             id="dateOfBirth"
//             label="Date of Birth"
//             type="date"
//             InputLabelProps={{
//               shrink: true,
//             }}
//             error={Boolean(errors?.dateOfBirth)}
//             helperText={(errors?.dateOfBirth?.message || "") as any}
//           />
//         )}
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Calculate Age
//       </Button>
//     </form>
//   );
// };

// export default AgeCalculator;
