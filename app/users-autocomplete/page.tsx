"use client";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
const UsersPage = () => {
  const [searchValue, setSearchValue] = useState(""); //Represents the current value entered into the search field.
  const [options, setOptions] = useState<User[]>([]); //options represents the list of user options fetched from the API based on the search value.
  const timeoutRef = useRef<any>(null);

  const searchUsers = useCallback(() => {
    if (!searchValue) return;
    console.log("set new time out");
    //searchUsers function sets a timeout of 400 milliseconds before making the API call.
    timeoutRef.current = setTimeout(() => {
      console.log("calling API by using search value");
      // Fetch data based on the search value
      const apiData = fetch(
        `https://jsonplaceholder.typicode.com/users?username_like=${searchValue}`
      )
        .then((response) => response.json())
        .then((data: User[]) => {
          setOptions(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 400);
  }, [searchValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      console.log("prev time out cleared");
      clearTimeout(timeoutRef.current);
    }
    setSearchValue(event.target.value);
    if (!event.target.value) {
      setOptions([]);
    }
  };

  useEffect(() => {
    console.log("useEffect called");
    searchUsers();
  }, [searchUsers]);

  return (
    <Box sx={{ padding: 16 }}>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.username}
        renderInput={(params) => (
          <TextField
            style={{
              background: "white",
              width: "90%",
              color: "blue",
            }}
            {...params}
            label="Search UserName"
            variant="outlined"
            onChange={handleChange}
            value={searchValue}
          />
        )}
      />
    </Box>
  );
};

export default UsersPage;
