import { FC, useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { type SxProps } from "@mui/material/styles";

import { useResponsive } from "shared/hooks";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";
import { formatStatus } from "shared/helpers";

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

  const renderColumnTitle = () =>
    !isMobileOrTablet && (
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
  const renderLoader = () => (
    <StyledWrapperBoxCircle>
      <CircularProgress size={20} />
    </StyledWrapperBoxCircle>
  );

  const renderLoadMoreButton = () =>
    hasMoreHomeworks &&
    shouldShowLoadMoreButton && (
      <Button onClick={handleLoadMore}>Загрузить еще</Button>
    );

  useEffect(() => {
    if (isTotalElements || isMaxLimit) {
      setHasMoreHomeworks(false);
    }
  }, [column.cards?.length, column.totalElements]);

  return (
    <StyledWrapperColumnBox>
      {renderColumnTitle()}
      <StyledWrapperColumnContainer
        id={`scroll-container-${column.id}`}
        ref={dropRef}
        sx={columnStyles as SxProps}
      >
        <StyledInfiniteScroll
          dataLength={column.cards?.length}
          next={handleLoadMore}
          hasMore={hasMoreHomeworks}
          loader={renderLoader()}
          scrollableTarget={`scroll-container-${column.id}`}
        >
          {children}
          <StyledBoxWrapper>{renderLoadMoreButton()}</StyledBoxWrapper>
        </StyledInfiniteScroll>
      </StyledWrapperColumnContainer>
    </StyledWrapperColumnBox>
  );
};

export default ColumnContent;
