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

import {
  StyledBox,
  StyledGridContainer,
  StyledPaper,
  StyledStack,
  StyledSubtitle,
  StyledTypography,
  StyledWrapper,
} from "./create-lectures.styled";
import { IEditLectures } from "./create-lectures.types";
import { AddLecture, DeleteLecture } from "../../containers";

const CreateLectures: FC<IEditLectures> = (props) => {
  const { data } = props;
  const { trainingLectures } = data;
  const location = useLocation();

  const lectureIds = trainingLectures?.map(
    (trainingLecture) => trainingLecture?.lecture?.id!
  );

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end">
        <AddLecture lectureIds={lectureIds} />
      </Box>
      <StyledGridContainer container>
        {trainingLectures?.map((item) => {
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
                        <StyledSubtitle variant="body2">
                          Продолжить
                        </StyledSubtitle>
                      </StyledBox>
                    </StyledPaper>
                  </CustomLink>
                </CardActionArea>
                <DeleteLecture lectureId={lectureId} lectureIds={lectureIds} />
              </Stack>
            </Grid>
          );
        })}
      </StyledGridContainer>
    </Container>
  );
};

export default CreateLectures;
