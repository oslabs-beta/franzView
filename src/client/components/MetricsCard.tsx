import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";

import { useQuery } from "@apollo/client";

import { MetricsCardProps } from "../../types/types";

const keySearch = (obj, string) => {
  for (const key in obj) {
    // console.log('key', key, 'obj', obj);
    if (key === string) {
      const output = obj[key];
      console.log(
        "key match",
        key,
        "string",
        string,
        "obj",
        obj,
        "value",
        obj[key],
        "output",
        output
      );
      return output;
    } else if (typeof obj[key] === "object") {
      return keySearch(obj[key], string);
    }
  }
};

const MetricsCard = ({
  value,
  title,
  description,
  icon,
  query,
  variables,
  searchingFor,
}: MetricsCardProps) => {
  if (query) {
    const { loading, data } = useQuery(query, { ...variables });
    const metric = keySearch(data, searchingFor);
    value = loading ? "Loading..." : metric;
  }

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="p" variant="h5">
        {value}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {description}
        </Typography>
        <ListItemIcon>{icon}</ListItemIcon>
      </Box>
    </React.Fragment>
  );
};

export default MetricsCard;
