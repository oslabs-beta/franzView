import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MonitorHeartTwoTone } from "@mui/icons-material";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function MetricsCard() {
  return (
    <React.Fragment>
      <Title>App Metrics</Title>
      <Typography component="p" variant="h5">
        Underreplicated Partitions
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Should be 0
      </Typography>
      <ListItemIcon>
        <MonitorHeartTwoTone />
      </ListItemIcon>
    </React.Fragment>
  );
}
