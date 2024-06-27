import { FC, useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TrainingLectureDto } from "api/graphql/generated/graphql";
import { CircularProgress, Container, Typography } from "@mui/material";
import { useResponsive } from "shared/hooks";
import { ReactComponent as HomeworksNotFound } from "assets/images/homework-not-found.svg";
import ContentNotFound from "shared/components/content-not-found";
import { useParams } from "react-router-dom";

import { ITable } from "./edit-lectures.types";
import {
  StyledBox,
  StyledButtonStack,
  StyledInfiniteScroll,
  StyledPaper,
} from "./edit-lectures.styled";
import DesktopTable from "../desktop-table";
import MobileTable from "../mobile-table";
import { CreateLecture, SelectLecture } from "../../containers";

const TableEditLectures: FC<ITable> = ({ data, columns, fetchMore }) => {
  const { trainingId } = useParams();

  const trainingLectures = data?.trainingLectures;
  const totalElements = data?.trainingLectures?.length;

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
    <StyledPaper id="scroll-mobile-container">
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
      <StyledPaper id="scroll-container">
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

  return (
    <Container>
      <StyledButtonStack>
        <SelectLecture lectureIds={lectureIds} trainingId={trainingId} />
        <CreateLecture lectureIds={lectureIds} />
      </StyledButtonStack>
      {noContent ? (
        <ContentNotFound text="Нет лекций" icon={<HomeworksNotFound />} />
      ) : isMobile ? (
        renderMobileTable()
      ) : (
        renderDesktopTable()
      )}
    </Container>
  );
};

export default TableEditLectures;
