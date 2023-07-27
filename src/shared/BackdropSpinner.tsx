import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { style } from "./styles";

const BackdropSpinner: React.FC = () => {
  return (
    <Backdrop sx={style.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropSpinner;
