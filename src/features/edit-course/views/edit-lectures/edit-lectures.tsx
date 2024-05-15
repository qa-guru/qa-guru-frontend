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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import { Clear } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";

import {
  StyledBox,
  StyledButtonsStack,
  StyledCancelButton,
  StyledGridContainer,
  StyledIconButton,
  StyledLink,
  StyledPaper,
  StyledSaveButton,
  StyledStack,
  StyledSubtitle,
  StyledTypography,
  StyledWrapper,
} from "./edit-lectures.styled";
import { IEditLectures } from "./edit-lectures.types";

const EditLectures: FC<IEditLectures> = (props) => {
  const { data, updatLecture, updateTrainingLecture } = props;
  const { trainingLectures } = data;
  const location = useLocation();
  const { trainingId } = useParams();
  const navigate = useNavigate();

  console.log(trainingLectures);

  const handleAddLecture = () => {
    updatLecture({
      variables: {
        input: {},
      },
      onCompleted: (result) => {
        const lectureIds = trainingLectures?.map((lecture) => lecture?.id!);

        updateTrainingLecture({
          variables: {
            id: trainingId!,
            lectureIds: [...lectureIds!, result?.updateLecture?.id!],
          },
        });
      },
    });
  };

  const handleRemoveLecture = () => {};

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end">
        <StyledIconButton onClick={handleAddLecture}>
          <AddIcon />
        </StyledIconButton>
      </Box>
      <StyledGridContainer container>
        {trainingLectures?.map((item) => {
          const { id, subject, description } = item?.lecture || {};

          return (
            <Grid item xs={12} key={id}>
              <Stack direction="row" alignItems="center">
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
                <Box>
                  <IconButton onClick={() => handleRemoveLecture()}>
                    <RemoveIcon color="primary" />
                  </IconButton>
                </Box>
              </Stack>
            </Grid>
          );
        })}
      </StyledGridContainer>
      <StyledButtonsStack>
        <StyledSaveButton type="submit" variant="contained">
          <SaveIcon fontSize="small" />
          Сохранить
        </StyledSaveButton>
        <StyledCancelButton
          color="secondary"
          variant="contained"
          onClick={() => navigate(-1)}
        >
          <Clear fontSize="small" />
          Отмена
        </StyledCancelButton>
      </StyledButtonsStack>
    </Container>
  );
};

export default EditLectures;
