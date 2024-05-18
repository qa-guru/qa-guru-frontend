import { FC, useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";
import useResponsive from "shared/hooks/use-responsive";

import {
  StyledBoxWrapper,
  StyledCardBox,
  StyledInfiniteScroll,
  StyledRowStack,
  StyledTypographyCount,
  StyledTypographyStatus,
  StyledWrapperBoxCircle,
  StyledWrapperColumnBox,
  StyledWrapperColumnContainer,
} from "./column.styled";
import Card from "../card";
import { getColumnStyles } from "../../helpers/get-column-styles";
import { getFormattedStatus } from "../../helpers/get-formatted-status";
import {
  HOMEWORKS_QUERY_DEFAULTS,
  MAX_CARDS_BEFORE_SHOW_MORE,
} from "../../constants";
import { IColumn } from "./column.types";

const Column: FC<IColumn> = ({
  column,
  fetchMore,
  onCardClick,
  activeCardId,
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

  useEffect(() => {
    if (isTotalElements || isMaxLimit) {
      setHasMoreHomeworks(false);
    }
  }, [column.cards?.length, column.totalElements]);

  return (
    <StyledWrapperColumnBox>
      {!isMobileOrTablet && (
        <StyledRowStack>
          <StyledTypographyStatus variant="h4">
            {getFormattedStatus(column.title)}
          </StyledTypographyStatus>
          <StyledTypographyCount variant="h4">
            {Number(column.totalElements) === 0
              ? "(0)"
              : `(${column.totalElements})`}
          </StyledTypographyCount>
        </StyledRowStack>
      )}
      <StyledWrapperColumnContainer
        id={`scroll-container-${column.id}`}
        sx={{
          ...(getColumnStyles(column.totalElements) as {}),
        }}
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
          {column.cards?.map((card, index) => (
            <StyledCardBox key={`${card.id}-${index}`}>
              <Card
                card={card}
                onCardClick={() => onCardClick?.(card)}
                isActive={activeCardId === card.id}
              />
            </StyledCardBox>
          ))}
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

export default Column;
