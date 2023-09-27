import React, { ReactNode } from "react";
import { StyledBox } from "../blurred.styled";

interface IBlurredComponent {
  children: ReactNode;
}

const BlurredComponent: React.FC<IBlurredComponent> = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default BlurredComponent;
