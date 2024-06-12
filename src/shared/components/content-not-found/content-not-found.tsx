import { FC } from "react";
import { Typography } from "@mui/material";

import { StyledNotFoundBox } from "./content-not-found.styled";
import { IContentNotFound } from "./content-not-found.types";

const ContentNotFound: FC<IContentNotFound> = ({ text, icon }) => {
  return (
    <StyledNotFoundBox>
      {icon}
      <Typography variant="h3" color="textSecondary">
        {text}
      </Typography>
    </StyledNotFoundBox>
  );
};

export default ContentNotFound;
