import React, { ReactNode } from "react";
import { IAdditionalLessons } from "./AdditionalLessons.types";

const AdditionalLessons: React.FC<IAdditionalLessons> = ({ children }) => {
  return <div>{children}</div>;
};

export default AdditionalLessons;
