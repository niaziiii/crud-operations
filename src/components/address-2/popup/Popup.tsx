import React from "react";
import { Paper, Typography } from "@mui/material";

const MarkerPopup = ({ message }: { message: string }): JSX.Element => {
  return (
    <Paper
      sx={{
        maxWidth: "300px",
        minWidth: "250px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          background: "#2C3333",
          color: "white",
          fontSize: ".8rem",
          padding: ".3rem .5rem",
        }}
      >
        Popup Here
      </Typography>
      <Typography
        variant="h5"
        sx={{
          padding: ".3rem .5rem",
          lineHeight: "1.5rem",
          fontSize: "1rem",
          fontWeight: "500",
        }}
      >
        {message}
      </Typography>
    </Paper>
  );
};

export default MarkerPopup;
