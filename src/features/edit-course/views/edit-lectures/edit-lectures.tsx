import { CardActionArea, Container, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import { TrainingLecturesQuery } from "api/graphql/generated/graphql";

import {
  StyledBox,
  StyledGridContainer,
  StyledLink,
  StyledPaper,
  StyledStack,
  StyledSubtitle,
  StyledTypography,
  StyledWrapper,
} from "./edit-lectures.styled";

interface IEditLectures {
  data: TrainingLecturesQuery;
}

const EditLectures: FC<IEditLectures> = (props) => {
  const { data } = props;
  const { trainingLectures } = data;
  const location = useLocation();

  return (
    <Container>
      <StyledGridContainer container>
        {trainingLectures?.map((item, index) => {
          const { id, subject, description } = item?.lecture || {};

          return (
            <Grid item xs={12} key={id}>
              <CardActionArea>
                <StyledLink to={`${location.pathname}/${id}`}>
                  <StyledPaper>
                    <Typography variant="h4">{subject}</Typography>
                    <StyledWrapper>
                      {description?.map((desc, index) => (
                        <StyledStack key={index}>
                          <StyledTypography variant="subtitle2">
                            {index + 1}
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

export default EditLectures;
