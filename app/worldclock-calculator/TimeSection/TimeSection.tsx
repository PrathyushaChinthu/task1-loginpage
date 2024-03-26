import React from "react";
import { Typography } from "@mui/material";

interface TimeSectionProps {
  title: string;
  time: string;
}

const TimeSection: React.FC<TimeSectionProps> = ({ title, time }) => {
  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">{time}</Typography>
    </div>
  );
};

export default TimeSection;
