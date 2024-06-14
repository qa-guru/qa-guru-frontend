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
  StyledRating,
  StyledRatingStack,
  StyledStarIcon,
} from "./rating-info.styled";

const RatingInfo: React.FC = () => {
  const theme = useTheme();
  const { rating, pink } = theme.palette.app;

  const ratingDescriptions = [
    { label: "0-50", color: rating.upTo50 },
    { label: "50-100", color: rating.upTo100 },
    { label: "100-200", color: rating.upTo200 },
    { label: "200-500", color: rating.upTo500 },
    { label: "500-1000", color: rating.upTo1000 },
    { label: "1000+", color: rating.upTo2000 },
  ];

  return (
    <StyledPaper>
      <StyledInfoStack>
        <StyledIconStack>
          <StyledIconBox color={pink}>
            <StyledStarIcon />
            <StyledTypography color={pink} variant="caption">
              Рейтинг
            </StyledTypography>
          </StyledIconBox>
          <Typography variant="h3">
            Что такое рейтинг и как он рассчитывется?
          </Typography>
        </StyledIconStack>
        <StyledInfoStack>
          <Typography variant="body2">
            Рейтинг пользователя - pariatur velit et iusto explicabo eum galisum
            amet eum galisum reprehenderit nam consequatur blanditiis in velit
            ullam. Eos totam soluta et beatae esse ut fuga nesciunt non aliquid
            atque! Aut sapiente quia ea debitis rerum est maiores eaque ex optio
            odit.
          </Typography>
          <Typography variant="body2">R’a = Ra + K*(Sa — Ea)</Typography>
          <Typography variant="body2">
            Где R’a - общий рейтинг, K* - коэффициент, Sa и Ea - черт его знает
            что. Цвета в зависимости от рейтинга:
          </Typography>
        </StyledInfoStack>
        <StyledRatingStack>
          {ratingDescriptions.map(({ label, color }) => (
            <StyledRating key={label} label={label} ratingColor={color} />
          ))}
        </StyledRatingStack>
      </StyledInfoStack>
    </StyledPaper>
  );
};

export default RatingInfo;
