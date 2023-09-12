import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { style } from "./styles";
import { primary } from "../../../theme/colors";

const Spinner: React.FC = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={style.gridSpinner}
    >
      <CircularProgress style={{ color: primary.main }} />
    </Grid>
  );
};

export default Spinner;
