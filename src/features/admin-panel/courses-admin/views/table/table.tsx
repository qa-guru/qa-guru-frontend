import { FC, useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CircularProgress } from "@mui/material";

import { TrainingDto } from "api/graphql/generated/graphql";
import { useResponsive } from "shared/hooks";

import DesktopTable from "../desktop-table";
import MobileTable from "../mobile-table";
import { ITable } from "./table.types";
import { StyledBox, StyledInfiniteScroll, StyledPaper } from "./table.styled";

const renderLoader = () => (
  <StyledBox>
    <CircularProgress size={25} />
  </StyledBox>
);

const TableAdmin: FC<ITable> = ({ data, columns, fetchMore }) => {
  const trainings = data?.trainings?.items;
  const { totalElements } = data?.trainings!;
  const [hasMoreTrainings, setHasMoreTrainings] = useState<boolean>(true);
  const { isMobile } = useResponsive();

  const table = useReactTable({
    data: trainings as TrainingDto[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        offset: trainings?.length,
        limit: 50,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          trainings: {
            ...fetchMoreResult.trainings,
            items: [
              ...(prev?.trainings?.items || []),
              ...(fetchMoreResult?.trainings?.items || []),
            ],
          },
        };
      },
    });
  };

  useEffect(() => {
    if (trainings?.length! >= totalElements) {
      setHasMoreTrainings(false);
    }
  }, [trainings]);

  const renderMobileTable = () => (
    <StyledPaper hasMoreTrainings={hasMoreTrainings}>
      <StyledInfiniteScroll
        dataLength={trainings?.length || 0}
        next={handleLoadMore}
        hasMore={hasMoreTrainings}
        loader={renderLoader()}
        scrollableTarget="scroll-mobile-container"
      >
        <MobileTable table={table} />
      </StyledInfiniteScroll>
    </StyledPaper>
  );

  const renderDesktopTable = () => (
    <StyledPaper hasMoreTrainings={hasMoreTrainings}>
      <StyledInfiniteScroll
        dataLength={trainings?.length || 0}
        next={handleLoadMore}
        hasMore={hasMoreTrainings}
        loader={renderLoader()}
        scrollableTarget="scroll-container"
      >
        <DesktopTable table={table} />
      </StyledInfiniteScroll>
    </StyledPaper>
  );

  return isMobile ? renderMobileTable() : renderDesktopTable();
};

export default TableAdmin;
