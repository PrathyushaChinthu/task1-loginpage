"use client";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const IntlValues = Intl.DateTimeFormat().resolvedOptions();
  const [date, setDate] = useState(new Date().toLocaleString());
  const [timezoneList, setTimezoneList] = useState<string[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const timeNow = new Date().toLocaleString();
      setDate(timeNow);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [date]);

  useEffect(() => {
    const listOfTimezones = Intl.supportedValuesOf("timeZone");
    setTimezoneList(listOfTimezones);
  }, []);

  const handleChange = () => {
    (e: any) => setSelectedTimezone(e.target.value);
  };

  return (
    <>
      <Box
        height={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ backgroundColor: "Black" }}
      >
        <Box
          width={"60%"}
          sx={{ backgroundColor: "#37e4e7" }}
          border={"5px solid black"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              width={"100%"}
              textAlign={"center"}
              sx={{ backgroundColor: "#e7376f" }}
            >
              <Typography variant="h3" fontWeight={"700"} color={"whitesmoke"}>
                World Clock
              </Typography>
            </Box>

            <Typography mt={1} variant="h5">
              Current Date & Time
            </Typography>
            <Typography variant="h6">
              Current Timezone: {IntlValues.timeZone}
            </Typography>
            <Box
              p={5}
              mt={1}
              fontSize={"larger"}
              fontWeight={"700"}
              color={"black"}
              sx={{ backgroundColor: "whitesmoke" }}
            >
              {date}
            </Box>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            style={{ marginTop: 24 }}
          >
            <Typography mb={1} variant="h5">
              Select Time Zone:{" "}
            </Typography>
            <Select
              style={{
                padding: "1rem 0.5rem",
                marginBottom: "1rem",
              }}
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {timezoneList.map((zone: any) => (
                <MenuItem key={zone} value={zone}>
                  {zone}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {selectedTimezone && (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography variant="h5" mt={1}>
                Selected Timezone: {selectedTimezone}
              </Typography>
              <Typography variant="h6" mt={1}>
                Selected Timezone Date & Time : {""}
              </Typography>
              <Box
                p={5}
                mt={1}
                mb={2}
                fontSize={"larger"}
                fontWeight={"700"}
                color={"black"}
                sx={{ backgroundColor: "whitesmoke" }}
              >
                {new Date().toLocaleString(IntlValues.locale, {
                  timeZone: selectedTimezone,
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
