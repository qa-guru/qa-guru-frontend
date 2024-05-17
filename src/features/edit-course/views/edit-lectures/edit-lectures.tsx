import {
  Box,
  CardActionArea,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { client } from "api";

import {
  StyledBox,
  StyledGridContainer,
  StyledIconButton,
  StyledLink,
  StyledPaper,
  StyledStack,
  StyledSubtitle,
  StyledTypography,
  StyledWrapper,
} from "./edit-lectures.styled";
import { IEditLectures } from "./edit-lectures.types";

const EditLectures: FC<IEditLectures> = (props) => {
  const { data, updatLecture, updateTrainingLecture, deleteLecture } = props;
  const { trainingLectures } = data;
  const location = useLocation();
  const { trainingId } = useParams();

  const lectureIds = trainingLectures?.map(
    (trainingLecture) => trainingLecture?.lecture?.id!
  );

  const handleAddLecture = () => {
    updatLecture({
      variables: {
        input: {},
      },
      onCompleted: (result) => {
        lectureIds?.push(result?.updateLecture?.id!);

        updateTrainingLecture({
          variables: {
            id: trainingId!,
            lectureIds: lectureIds!,
          },
          onCompleted: () => {
            client.refetchQueries({ include: ["trainingLectures"] });
          },
        });
      },
    });
  };

  const handleRemoveLecture = (lectureId: string | null | undefined) => {
    const newLectureIds = lectureIds?.filter((id) => id !== lectureId);

    updateTrainingLecture({
      variables: {
        id: trainingId!,
        lectureIds: newLectureIds,
      },
      onCompleted: () => {
        deleteLecture({
          variables: { id: lectureId! },
          onCompleted: () => {
            client.refetchQueries({ include: ["trainingLectures"] });
          },
        });
      },
    });
  };

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end">
        <StyledIconButton onClick={handleAddLecture}>
          <AddIcon />
        </StyledIconButton>
      </Box>
      <StyledGridContainer container>
        {trainingLectures?.map((item) => {
          const { id: lectureId, subject, description } = item?.lecture || {};

          return (
            <Grid item xs={12} key={lectureId}>
              <Stack direction="row" alignItems="center">
                <CardActionArea>
                  <StyledLink to={`${location.pathname}/${lectureId}`}>
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
                  </StyledLink>
                </CardActionArea>
                <Box>
                  <IconButton onClick={() => handleRemoveLecture(lectureId)}>
                    <RemoveIcon color="primary" />
                  </IconButton>
                </Box>
              </Stack>
            </Grid>
          );
        })}
      </StyledGridContainer>
    </Container>
  );
};

export default EditLectures;
