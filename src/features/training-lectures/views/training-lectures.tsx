import React from "react";
import { CardActionArea, Container, Grid, Typography } from "@mui/material";
import ButtonTrainingList from "shared/components/buttons/button-training-list/button-training-list";
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
import { INDEX_OFFSET } from "../constants/constants";

const TrainingLectures: React.FC<ITrainingLectures> = (props) => {
  const { dataTrainingLectures, trainingId, dataTraining } = props;
  const { trainingLectures } = dataTrainingLectures;
  const { name } = dataTraining.training!;

  return (
    <Container>
      <ButtonTrainingList />
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
                              {index + INDEX_OFFSET}
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
    </Container>
  );
};

export default TrainingLectures;
