import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface IBlurredComponent {
  children: ReactNode;
}

const style = {
  wrapper: { filter: "blur(3.5px)", pointerEvents: "none" },
};

const BlurredComponent: React.FC<IBlurredComponent> = ({ children }) => {
  return <Box sx={style.wrapper}>{children}</Box>;
};

export default BlurredComponent;
