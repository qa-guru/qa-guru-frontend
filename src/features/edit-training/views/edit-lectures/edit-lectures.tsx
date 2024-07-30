import { FC, useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as HomeworksNotFound } from "assets/images/homework-not-found.svg";
import ContentNotFound from "shared/components/content-not-found";
import { useResponsive } from "shared/hooks";
import { TrainingLectureDto } from "api/graphql/generated/graphql";

import { ITable } from "./edit-lectures.types";
import {
  StyledBox,
  StyledButtonsStack,
  StyledInfiniteScroll,
  StyledPaper,
  StyledSubmitButtonsStack,
} from "./edit-lectures.styled";
import DesktopTable from "../desktop-table";
import MobileTable from "../mobile-table";
import { CreateLecture, SelectLecture } from "../../containers";

const TableEditLectures: FC<ITable> = ({ data, columns, fetchMore }) => {
  const trainingLectures = data?.trainingLectures;
  const totalElements = data?.trainingLectures?.length;

  const navigate = useNavigate();
  const location = useLocation();

  const noContent = data?.trainingLectures?.length === 0;
  const lectureIds = data?.trainingLectures?.map(
    (trainingLecture) => trainingLecture?.lecture?.id!
  );

  const [hasMoreTrainingLectures, setHasMoreTrainingLectures] =
    useState<boolean>(true);
  const { isMobile } = useResponsive();

  const table = useReactTable({
    data: trainingLectures as TrainingLectureDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        offset: trainingLectures?.length,
        limit: 50,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          trainingLectures: [
            ...(prev?.trainingLectures || []),
            ...(fetchMoreResult?.trainingLectures || []),
          ],
        };
      },
    });
  };

  const handleBack = () => {
    const newPathname = location.pathname.replace("/edit-lectures", "");
    navigate(newPathname);
  };

  const renderLoader = () => (
    <StyledBox>
      <CircularProgress size={25} />
    </StyledBox>
  );

  useEffect(() => {
    if (trainingLectures?.length! >= totalElements!) {
      setHasMoreTrainingLectures(false);
    }
  }, [trainingLectures]);

  const renderMobileTable = () => (
    <StyledPaper hasMoreTrainingLectures={hasMoreTrainingLectures}>
      <StyledInfiniteScroll
        dataLength={trainingLectures?.length || 0}
        next={handleLoadMore}
        hasMore={hasMoreTrainingLectures}
        loader={renderLoader()}
        scrollableTarget="scroll-mobile-container"
      >
        <MobileTable<TrainingLectureDto> table={table} />
      </StyledInfiniteScroll>
    </StyledPaper>
  );

  const renderDesktopTable = () => (
    <>
      <Typography variant="h5">Уроки ({trainingLectures?.length})</Typography>
      <StyledPaper hasMoreTrainingLectures={hasMoreTrainingLectures}>
        <StyledInfiniteScroll
          dataLength={trainingLectures?.length || 0}
          next={handleLoadMore}
          hasMore={hasMoreTrainingLectures}
          loader={renderLoader()}
          scrollableTarget="scroll-container"
        >
          <DesktopTable<TrainingLectureDto> table={table} />
        </StyledInfiniteScroll>
      </StyledPaper>
    </>
  );

  const renderTable = () =>
    isMobile ? renderMobileTable() : renderDesktopTable();

  return (
    <Container>
      <StyledButtonsStack>
        <Box>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleBack}
            endIcon={<Clear fontSize="small" />}
          >
            Отменить
          </Button>
        </Box>
        <StyledSubmitButtonsStack>
          <SelectLecture lectureIds={lectureIds} />
          <CreateLecture lectureIds={lectureIds} />
        </StyledSubmitButtonsStack>
      </StyledButtonsStack>
      {noContent ? (
        <ContentNotFound text="Нет лекций" icon={<HomeworksNotFound />} />
      ) : (
        renderTable()
      )}
    </Container>
  );
};

export default TableEditLectures;
