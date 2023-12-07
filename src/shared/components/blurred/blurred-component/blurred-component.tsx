import { FC, ReactNode } from "react";

import { StyledBox } from "../blurred.styled";

interface IBlurredComponent {
  children: ReactNode;
}

const BlurredComponent: FC<IBlurredComponent> = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default BlurredComponent;
