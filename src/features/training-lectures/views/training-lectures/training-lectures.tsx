import { FC } from "react";
import {
  CardActionArea,
  Container,
  Grid,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import {
  Lock as LockIcon,
  Schedule as ScheduleIcon,
  LockOpen as LockOpenIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";

import CustomLink from "shared/components/custom-link";

import { ITrainingLectures } from "./training-lectures.types";
import {
  StyledBox,
  StyledGridContainer,
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
          const { locking, availableFrom, isAvailable } = item || {};

          const formatDate = (date: string | null | undefined) => {
            if (!date) return "";
            return dayjs(date).format("DD.MM.YYYY HH:mm");
          };

          const getStatusChip = () => {
            if (locking) {
              return (
                <Chip
                  icon={<LockIcon />}
                  label="Урок заблокирован"
                  color="error"
                  size="small"
                />
              );
            }
            if (!isAvailable && availableFrom) {
              return (
                <Chip
                  icon={<ScheduleIcon />}
                  label={`Доступен с ${formatDate(availableFrom)}`}
                  color="warning"
                  size="small"
                />
              );
            }
            return (
              <Chip
                icon={<LockOpenIcon />}
                label="Доступен"
                color="success"
                size="small"
              />
            );
          };

          const isLessonAccessible = !locking && isAvailable;

          return (
            <Grid item xs={12} key={id}>
              <CardActionArea disabled={!isLessonAccessible}>
                {isLessonAccessible ? (
                  <CustomLink path={`/training/${trainingId}/${id}`}>
                    <StyledPaper>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <Typography variant="h4">{subject}</Typography>
                        {getStatusChip()}
                      </Box>
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
                  </CustomLink>
                ) : (
                  <StyledPaper
                    sx={{ opacity: 0.6, cursor: "not-allowed !important" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h4">{subject}</Typography>
                      {getStatusChip()}
                    </Box>
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
                        {locking ? "Урок недоступен" : "Скоро откроется"}
                      </StyledSubtitle>
                    </StyledBox>
                  </StyledPaper>
                )}
              </CardActionArea>
            </Grid>
          );
        })}
      </StyledGridContainer>
    </Container>
  );
};

export default TrainingLectures;
