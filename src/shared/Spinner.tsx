import React from "react";
import { CircularProgress, Grid } from "@mui/material";

const Spinner: React.FC = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <CircularProgress />
    </Grid>
  );
};

export default Spinner;
