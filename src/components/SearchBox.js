import React from "react";
import { Box, TextField } from "@mui/material";

const SearchBox = ({ placeholder, handleChange, searchText }) => {
  return (
    <Box
      component="form"
      sx={{
        width: 300,
        maxWidth: "100%",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        id="outlined-textarea"
        label={placeholder}
        placeholder={placeholder}
        value={searchText}
        onChange={handleChange}
        multiline
      />
    </Box>
  );
};

export default SearchBox;
