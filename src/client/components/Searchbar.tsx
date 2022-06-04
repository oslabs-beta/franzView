import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import { DocumentNode } from "graphql";
import { useQuery } from "@apollo/client";

export interface searchProps {
  query: DocumentNode;
  searchingFor: string;
}

function SearchBar({ query, searchingFor }: searchProps) {
  const { loading, data } = useQuery(query);
  return (
    <Autocomplete
      options={
        loading
          ? ["Loading..."]
          : data[searchingFor].map((item) => {
              let option = "";
              for (const key of Object.keys(item)) {
                if (key === "__typename") continue;
                option += `${key}: ${item[key]} `;
              }
              return option;
            })
      }
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
