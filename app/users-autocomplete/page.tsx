"use client";
import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
const UsersPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<User[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);

    // Fetch data based on the input value
    fetch(`https://jsonplaceholder.typicode.com/users?username_like=${value}`)
      .then((response) => response.json())
      .then((data: User[]) => {
        setOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.username}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search UserName"
          variant="outlined"
          onChange={handleChange}
          value={inputValue}
        />
      )}
    />
  );
};

export default UsersPage;
