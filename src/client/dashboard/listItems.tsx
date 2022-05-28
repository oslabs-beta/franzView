import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DynamicFeed from "@mui/icons-material/DynamicFeed";
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import Topic from "@mui/icons-material/Topic";

const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DynamicFeed />
      </ListItemIcon>
      <ListItemText primary="Broker" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Login />
      </ListItemIcon>
      <ListItemText primary="Producers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText primary="Consumers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Topic />
      </ListItemIcon>
      <ListItemText primary="Topics" />
    </ListItemButton>
  </React.Fragment>
);

export default mainListItems;
