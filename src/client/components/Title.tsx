import * as React from "react";
import Typography from "@mui/material/Typography";

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="#00f980" gutterBottom>
      {props.children}
    </Typography>
  );
}
