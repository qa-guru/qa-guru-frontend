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

import CustomLink from "shared/components/custom-link";
import {
  isLectureAccessible,
  lectureGateKind,
  lectureListChipLabel,
  lectureListFooter,
  LectureScheduleSlot,
} from "shared/helpers";

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

const LectureStatusChip: FC<{ slot?: LectureScheduleSlot | null }> = ({
  slot,
}) => {
  const kind = lectureGateKind(slot);
  const label = lectureListChipLabel(slot);

  if (kind === "locked") {
    return (
      <Chip icon={<LockIcon />} label={label} color="error" size="small" />
    );
  }

  if (kind === "scheduled") {
    return (
      <Chip icon={<ScheduleIcon />} label={label} color="warning" size="small" />
    );
  }

  return (
    <Chip icon={<LockOpenIcon />} label={label} color="success" size="small" />
  );
};

const TrainingLectures: FC<ITrainingLectures> = (props) => {
  const { dataTrainingLectures, trainingId, dataTraining } = props;
  const { trainingLectures } = dataTrainingLectures;
  const name = dataTraining?.training?.name;

  return (
    <Container>
      <Typography variant="h2">{name}</Typography>
      <StyledGridContainer container>
        {trainingLectures?.map((item) => {
          const { id, subject, description } = item?.lecture || {};
          const accessible = isLectureAccessible(item);

          return (
            <Grid item xs={12} key={id}>
              <CardActionArea>
                <CustomLink path={`/training/${trainingId}/${id}`}>
                  <StyledPaper
                    sx={
                      accessible
                        ? undefined
                        : { opacity: 0.6 }
                    }
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
                      <LectureStatusChip slot={item} />
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
                        {lectureListFooter(item)}
                      </StyledSubtitle>
                    </StyledBox>
                  </StyledPaper>
                </CustomLink>
              </CardActionArea>
            </Grid>
          );
        })}
      </StyledGridContainer>
    </Container>
  );
};

export default TrainingLectures;
