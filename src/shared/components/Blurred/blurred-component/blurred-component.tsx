import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import { style } from "../styles";

interface IBlurredComponent {
  children: ReactNode;
}

const BlurredComponent: React.FC<IBlurredComponent> = ({ children }) => {
  return <Box sx={style.wrapper}>{children}</Box>;
};

export default BlurredComponent;
