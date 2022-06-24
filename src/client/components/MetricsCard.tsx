import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";

export type Props = {
  value: number;
  title: string;
  toBe: string;
  icon?: React.ReactNode;
};

const MetricsCard = ({ value, title, toBe, icon }: Props) => {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="p" variant="h5">
        {value}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {toBe}
        </Typography>
        <ListItemIcon>{icon}</ListItemIcon>
      </Box>
    </React.Fragment>
  );
};

export default MetricsCard;
