import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import { DocumentNode } from "graphql";
import { useQuery } from "@apollo/client";
import { keyMap } from "../models/typeKeyMap";
export interface searchProps {
  query: DocumentNode;
  searchingFor: string;
  setFilter: React.Dispatch<React.SetStateAction<any[]>>;
}

function SearchBar({ query, searchingFor, setFilter }: searchProps) {
  const { loading, data } = useQuery(query);
  return (
    <Autocomplete
      options={
        loading
          ? ["Loading..."]
          : data[searchingFor].map((item) => {
              let option = "";
              let value;
              for (const key of Object.keys(item)) {
                if (key === "__typename") continue;
                option += `${key}: ${item[key]} `;
                if (key === keyMap[searchingFor]) value = item[key];
              }
              option = option.trimEnd();
              return { label: option, id: value };
            })
      }
      isOptionEqualToValue={(
        option: any | Array<any>,
        value: any | Array<any>
      ) => {
        return option.id === value.id;
      }}
      onChange={(event, value: any | Array<any>) => {
        setFilter([value.id]);
        return value;
      }}
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
