import { FC } from "react";
import { CardActionArea, Container, Grid, Typography } from "@mui/material";
import { ButtonTrainingList } from "shared/components/buttons";

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
import { INDEX_OFFSET } from "../constants";

const TrainingLectures: FC<ITrainingLectures> = (props) => {
  const { dataTrainingLectures, trainingId, dataTraining } = props;
  const { trainingLectures } = dataTrainingLectures;
  const name = dataTraining?.training?.name;

  return (
    <Container>
      <ButtonTrainingList />
      <Typography variant="h2">{name}</Typography>
      <StyledGridContainer container>
        {trainingLectures?.map((item, index) => {
          const { id, subject, description } = item?.lecture || {};

          return (
            <Grid item xs={12} key={id}>
              <StyledLink to={`/training/${trainingId}/${id}`}>
                <CardActionArea>
                  <StyledPaper>
                    <Typography variant="h4">{subject}</Typography>
                    <StyledWrapper>
                      <StyledStack>
                        <StyledTypography variant="subtitle2">
                          {index + INDEX_OFFSET}
                        </StyledTypography>
                        <Typography variant="subtitle1">
                          {description}
                        </Typography>
                      </StyledStack>
                    </StyledWrapper>
                    <StyledBox>
                      <StyledSubtitle variant="body2">
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
