import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MonitorHeartTwoTone } from "@mui/icons-material";

export type Props = {
  value: number;
  title: string;
  toBe: string;
};

const MetricsCard = ({ value, title, toBe }: Props) => {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="p" variant="h5">
        {/* 0 */}
        {value}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {/* TEST */}
        {toBe}
      </Typography>
      <ListItemIcon>
        <MonitorHeartTwoTone />
      </ListItemIcon>
    </React.Fragment>
  );
};

export default MetricsCard;
