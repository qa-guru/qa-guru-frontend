import { Typography } from "antd";
import React from "react";
import { IMainLessons } from "./MainLessons.types";

const MainLessons: React.FC<IMainLessons> = ({ children }) => {
  return <div>{children}</div>;
};

export default MainLessons;
