import { FC, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";

import { IColumn } from "./column.types";
import {
  StyledCardBox,
  StyledInfiniteScroll,
  StyledLoadMoreButton,
  StyledRowStack,
  StyledTypographyCount,
  StyledTypographyStatus,
  StyledWrapperBoxCircle,
  StyledWrapperColumnBox,
  StyledWrapperColumnContainer,
} from "./column.styled";
import Card from "../card";
import { getFormattedStatus } from "../../helpers/get-formatted-status";
import { HOMEWORKS_QUERY_DEFAULTS } from "../../constants";

const Column: FC<IColumn> = ({
  column,
  fetchMore,
  onCardClick,
  activeCardId,
}) => {
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);
  const [showButton, setShowButton] = useState<boolean>(true);

  const handleLoadMore = () => {
    if (column.cards?.length >= HOMEWORKS_QUERY_DEFAULTS.MAX) {
      setHasMoreHomeworks(false);
      return;
    }
    setShowButton(false);
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
    if (
      column.cards?.length >= column.totalElements ||
      column.cards?.length >= HOMEWORKS_QUERY_DEFAULTS.MAX
    ) {
      setHasMoreHomeworks(false);
    }
  }, [column.cards?.length, column.totalElements]);

  return (
    <StyledWrapperColumnBox>
      <StyledRowStack>
        <StyledTypographyStatus variant="h4">
          {getFormattedStatus(column.title)}
        </StyledTypographyStatus>
        <StyledTypographyCount variant="h4">
          {Number(column.totalElements) === 0
            ? "(empty)"
            : `(${column.totalElements})`}
        </StyledTypographyCount>
      </StyledRowStack>
      <StyledWrapperColumnContainer
        id={`scroll-container-${column.id}`}
        showButton={showButton}
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
                onCardClick={() => onCardClick && onCardClick(card)}
                isActive={activeCardId === card.id}
              />
            </StyledCardBox>
          ))}
        </StyledInfiniteScroll>
      </StyledWrapperColumnContainer>
      {showButton && hasMoreHomeworks && (
        <StyledLoadMoreButton onClick={handleLoadMore}>
          Загрузить еще
        </StyledLoadMoreButton>
      )}
    </StyledWrapperColumnBox>
  );
};

export default Column;
