import { FC } from "react";
import { CardActionArea, Container, Grid, Typography } from "@mui/material";

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
import { INDEX_OFFSET } from "../../constants";

const TrainingLectures: FC<ITrainingLectures> = (props) => {
  const { dataTrainingLectures, trainingId, dataTraining } = props;
  const { trainingLectures } = dataTrainingLectures;
  const name = dataTraining?.training?.name;

  return (
    <Container>
      <Typography variant="h2">{name}</Typography>
      <StyledGridContainer container>
        {trainingLectures?.map((item, index) => {
          const { id, subject, description } = item?.lecture || {};

          return (
            <Grid item xs={12} key={id}>
              <CardActionArea>
                <StyledLink to={`/training/${trainingId}/${id}`}>
                  <StyledPaper>
                    <Typography variant="h4">{subject}</Typography>
                    <StyledWrapper>
                      {description?.map((desc, index) => (
                        <StyledStack key={index}>
                          <StyledTypography variant="subtitle2">
                            {index + INDEX_OFFSET}
                          </StyledTypography>
                          <Typography variant="subtitle1">{desc}</Typography>
                        </StyledStack>
                      ))}
                    </StyledWrapper>
                    <StyledBox>
                      <StyledSubtitle variant="body2">
                        Продолжить
                      </StyledSubtitle>
                    </StyledBox>
                  </StyledPaper>
                </StyledLink>
              </CardActionArea>
            </Grid>
          );
        })}
      </StyledGridContainer>
    </Container>
  );
};

export default TrainingLectures;
