import { FC, useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useResponsive } from "shared/hooks";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";
import { formatStatus } from "shared/helpers";
import { type SxProps } from "@mui/material/styles";

import {
  StyledBoxWrapper,
  StyledInfiniteScroll,
  StyledRowStack,
  StyledTypographyCount,
  StyledTypographyStatus,
  StyledWrapperBoxCircle,
  StyledWrapperColumnBox,
  StyledWrapperColumnContainer,
} from "./column-content.styled";
import {
  HOMEWORKS_QUERY_DEFAULTS,
  MAX_CARDS_BEFORE_SHOW_MORE,
} from "../../constants";
import { IColumnContent } from "./column-content.types";

const ColumnContent: FC<IColumnContent> = ({
  column,
  fetchMore,
  children,
  dropRef,
  columnStyles,
}) => {
  const { isMobileOrTablet } = useResponsive();
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);

  const isTotalElements = column.cards?.length >= column.totalElements;
  const isMaxLimit = column.cards?.length >= HOMEWORKS_QUERY_DEFAULTS.MAX;
  const shouldShowLoadMoreButton =
    column.cards?.length <= MAX_CARDS_BEFORE_SHOW_MORE;

  const statusColumn = !isMobileOrTablet && (
    <StyledRowStack>
      <StyledTypographyStatus variant="h4">
        {formatStatus(column.title)}
      </StyledTypographyStatus>
      <StyledTypographyCount variant="h4">
        {Number(column.totalElements) === 0
          ? "(0)"
          : `(${column.totalElements})`}
      </StyledTypographyCount>
    </StyledRowStack>
  );

  const handleLoadMore = () => {
    if (isMaxLimit) {
      setHasMoreHomeworks(false);
      return;
    }
    fetchMore({
      variables: {
        offset: column.cards?.length,
      },
      updateQuery: (
        prev: { homeWorks: { items: StudentHomeWorkDto[] } },
        {
          fetchMoreResult,
        }: { fetchMoreResult: { homeWorks: { items: StudentHomeWorkDto[] } } }
      ) => {
        if (!fetchMoreResult) return prev;

        return {
          homeWorks: {
            ...fetchMoreResult.homeWorks,
            items: [
              ...prev.homeWorks.items,
              ...fetchMoreResult.homeWorks.items,
            ],
          },
        };
      },
    });
  };

  useEffect(() => {
    if (isTotalElements || isMaxLimit) {
      setHasMoreHomeworks(false);
    }
  }, [column.cards?.length, column.totalElements]);

  return (
    <StyledWrapperColumnBox>
      {statusColumn}
      <StyledWrapperColumnContainer
        id={`scroll-container-${column.id}`}
        ref={dropRef}
        sx={columnStyles as SxProps}
      >
        <StyledInfiniteScroll
          dataLength={column.cards?.length}
          next={handleLoadMore}
          hasMore={hasMoreHomeworks}
          loader={
            <StyledWrapperBoxCircle>
              <CircularProgress size={20} />
            </StyledWrapperBoxCircle>
          }
          scrollableTarget={`scroll-container-${column.id}`}
        >
          {children}
          <StyledBoxWrapper>
            {hasMoreHomeworks && shouldShowLoadMoreButton && (
              <Button onClick={handleLoadMore}>Загрузить еще</Button>
            )}
          </StyledBoxWrapper>
        </StyledInfiniteScroll>
      </StyledWrapperColumnContainer>
    </StyledWrapperColumnBox>
  );
};

export default ColumnContent;
