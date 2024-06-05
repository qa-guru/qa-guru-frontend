import { FC } from "react";
import { Typography } from "@mui/material";
import { ReactComponent as HomeworksNotFound } from "assets/images/homework-not-found.svg";
import { ReactComponent as UsersNotFound } from "assets/images/user-not-found.svg";

import { StyledNotFoundBox } from "./content-not-found.styled";
import { IContentNotFound } from "./content-not-found.types";

const ContentNotFound: FC<IContentNotFound> = ({ text, isUsers }) => {
  return (
    <StyledNotFoundBox>
      {isUsers ? <UsersNotFound /> : <HomeworksNotFound />}
      <Typography variant="h3" color="textSecondary">
        {text}
      </Typography>
    </StyledNotFoundBox>
  );
};

export default ContentNotFound;
