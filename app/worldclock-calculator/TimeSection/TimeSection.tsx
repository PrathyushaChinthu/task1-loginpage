import React from "react";
import { Typography, Box } from "@mui/material";

interface TimeSectionProps {
  title: string;
  time: string;
}

const TimeSection = ({ title, time }: TimeSectionProps) => {
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">{time}</Typography>
    </Box>
  );
};

export default TimeSection;
