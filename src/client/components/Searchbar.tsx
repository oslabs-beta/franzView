import React, { Props } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import { DocumentNode } from "graphql";
import { useQuery } from "@apollo/client";

export interface searchProps {
  query: DocumentNode;
}

function SearchBar({ query }: searchProps) {
  const { loading, data } = useQuery();
  return (
    <Autocomplete
      options={["brokerId: 1"]}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

export default SearchBar;
