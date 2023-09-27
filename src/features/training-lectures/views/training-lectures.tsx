import React from "react";
import { CardActionArea, Grid, Typography } from "@mui/material";
import { ITrainingLectures } from "./training-lectures.types";
import {
  StyledBox,
  StyledGridContainer,
  StyledLink,
  StyledPaper,
  StyledStack,
  StyledSubtitle,
  StyledTypography,
  StyledWrapper,
} from "./training-lectures.styled";

const TrainingLectures: React.FC<ITrainingLectures> = (props) => {
  const { dataTrainingLectures, trainingId, dataTraining } = props;
  const { trainingLectures } = dataTrainingLectures;
  const { name } = dataTraining.training!;

  return (
    <>
      <Typography variant="h4">{name}</Typography>
      <StyledGridContainer container>
        {trainingLectures?.map((item, index) => {
          const { id, subject, description } = item!.lecture!;

          return (
            <Grid item xs={12} key={index}>
              <StyledLink to={`/training/${trainingId}/${id}`}>
                <CardActionArea>
                  <StyledPaper>
                    <Typography variant="h6">{subject}</Typography>
                    <StyledWrapper>
                      {description?.map((value, index) => {
                        return (
                          <StyledStack key={index}>
                            <StyledTypography variant="subtitle2">
                              {index + 1}
                            </StyledTypography>
                            <Typography variant="subtitle1">{value}</Typography>
                          </StyledStack>
                        );
                      })}
                    </StyledWrapper>
                    <StyledBox>
                      <StyledSubtitle variant="subtitle2">
                        Продолжить
                      </StyledSubtitle>
                    </StyledBox>
                  </StyledPaper>
                </CardActionArea>
              </StyledLink>
            </Grid>
          );
        })}
      </StyledGridContainer>
    </>
  );
};

export default TrainingLectures;
