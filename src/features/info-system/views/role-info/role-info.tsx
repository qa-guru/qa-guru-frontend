import React from "react";
import { Typography, useTheme } from "@mui/material";

import {
  StyledIconBox,
  StyledIconStack,
  StyledInfoStack,
  StyledPaper,
  StyledTypography,
} from "../info-system/info-system.styled";
import {
  StyledCoPresentIcon,
  StyledNestedPaper,
  StyledNestedPaperStack,
  StyledPaperStack,
} from "./role-info.styled";

const RoleInfo: React.FC = () => {
  const theme = useTheme();
  const { indigo } = theme.palette.app;

  const roles = [
    {
      title: "Студент",
      description:
        "Au pariatur velit et iusto explicabo eum galisum amet eum galisum reprehenderit nam consequatur blanditiis in velit ullam. Eos totam soluta et beatae esse ut fuga nesciunt non aliquid atque! Aut sapiente quia ea debitis rerum est maiores eaque ex optio odit.",
    },
    {
      title: "Ментор",
      description:
        "Ab pariatur velit et iusto explicabo eum galisum amet eum galisum reprehenderit nam consequatur blanditiis in velit ullam. Eos totam soluta et beatae esse ut fuga nesciunt non aliquid atque! Aut sapiente quia ea debitis rerum est maiores eaque ex optio odit.",
    },
    {
      title: "Преподаватель",
      description:
        "Ab pariatur velit et iusto explicabo eum galisum amet eum galisum reprehenderit nam consequatur blanditiis in velit ullam. Eos totam soluta et beatae esse ut fuga несciunt non aliquid atque! Aut sapiente quia ea debitis rerum est maiores eaque ex optio odit.",
    },
    {
      title: "Админ",
      description:
        "Ab pariatur velit et iusto explicabo eum galisum amet eum galisum reprehenderit nam consequatur blanditiis in velit ullam. Eos totam soluta et beatae esse ut fuga nesciunt non aliquid atque! Aut sapiente quia ea debitis rerum est maiores eaque ex optio odit.",
    },
  ];

  return (
    <StyledPaperStack>
      <StyledPaper>
        <StyledInfoStack>
          <StyledIconStack>
            <StyledIconBox color={indigo}>
              <StyledCoPresentIcon />
              <StyledTypography color={indigo} variant="caption">
                Роли
              </StyledTypography>
            </StyledIconBox>
            <Typography variant="h3">
              Что такое рейтинг и как он рассчитывется?
            </Typography>
          </StyledIconStack>
          <StyledInfoStack>
            <Typography variant="body2">
              Nam natus illum non alias doloribus ut natus quod eos velit esse.
              In aliquid itaque cum exercitationem quaerat eum amet corporis. Ad
              enim laudantium sed possimus dolor? Ab pariatur velit et iusto
              explicabo eum galisum amet eum galisum reprehenderit nam
              consequatur blanditiis in velit ullam. Eos totam soluta et beatae
              esse ut fuga nesciunt non aliquid atque! Aut sapiente quia ea
              debitis rerum est maiores eaque ex optio odit.
            </Typography>
            <Typography variant="body2">
              1. In aliquid itaque cum exercitationem quaerat eum amet corporis.
            </Typography>
            <Typography variant="body2">
              2. Ad enim laudantium sed possimus dolor?
            </Typography>
            <Typography variant="body2">
              Ab pariatur velit et iusto explicabo eum galisum amet eum galisum
              reprehenderit nam consequatur blanditiis in velit ullam. Eos totam
              soluta et beatae esse ut fuga nesciunt non aliquid atque! Aut
              sapiente quia ea debitis rerum est maiores eaque ex optio odit.
            </Typography>
          </StyledInfoStack>
          {roles.map((role, index) => (
            <StyledNestedPaper key={index}>
              <StyledNestedPaperStack>
                <Typography variant="h5">{role.title}</Typography>
                <Typography variant="body2">{role.description}</Typography>
              </StyledNestedPaperStack>
            </StyledNestedPaper>
          ))}
        </StyledInfoStack>
      </StyledPaper>
    </StyledPaperStack>
  );
};

export default RoleInfo;
