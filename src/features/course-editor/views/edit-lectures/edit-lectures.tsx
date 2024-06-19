import {
  Box,
  CardActionArea,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import CustomLink from "shared/components/custom-link";
import ContentNotFound from "shared/components/content-not-found";
import { ReactComponent as HomeworksNotFound } from "assets/images/homework-not-found.svg";
import { Maybe, TrainingLectureDto } from "api/graphql/generated/graphql";

import { AddLecture, DeleteLecture } from "../../containers";
import {
  StyledBox,
  StyledGridContainer,
  StyledPaper,
  StyledStack,
  StyledSubtitle,
  StyledTypography,
  StyledWrapper,
} from "./edit-lectures.styled";
import { IEditLectures } from "./edit-lectures.types";

const EditLectures: FC<IEditLectures> = (props) => {
  const { data } = props;
  const { trainingLectures } = data;
  const location = useLocation();

  const lectureIds = trainingLectures?.map(
    (trainingLecture) => trainingLecture?.lecture?.id!
  );

  const noContent = trainingLectures?.length === 0;

  const renderNotFound = () => (
    <ContentNotFound text="Нет домашних работ" icon={<HomeworksNotFound />} />
  );

  const renderLectureItem = (item: Maybe<TrainingLectureDto>) => {
    const { id: lectureId, subject, description } = item?.lecture || {};

    return (
      <Grid item xs={12} key={lectureId}>
        <Stack direction="row" alignItems="center">
          <CardActionArea>
            <CustomLink path={`${location.pathname}/${lectureId}`}>
              <StyledPaper>
                {!subject ? (
                  <Typography variant="h4">Новый урок</Typography>
                ) : (
                  <Typography variant="h4">{subject}</Typography>
                )}
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
                  <StyledSubtitle variant="body2">Продолжить</StyledSubtitle>
                </StyledBox>
              </StyledPaper>
            </CustomLink>
          </CardActionArea>
          <DeleteLecture lectureId={lectureId} lectureIds={lectureIds} />
        </Stack>
      </Grid>
    );
  };

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end">
        <AddLecture lectureIds={lectureIds} />
      </Box>
      {noContent ? (
        renderNotFound()
      ) : (
        <StyledGridContainer container>
          {trainingLectures?.map(renderLectureItem)}
        </StyledGridContainer>
      )}
    </Container>
  );
};

export default EditLectures;
