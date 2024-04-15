import { FC, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";
import useResponsive from "shared/hooks/use-responsive";

import { IColumn } from "./column.types";
import {
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
import { getFormattedStatus } from "../../helpers/get-formatted-status";
import { HOMEWORKS_QUERY_DEFAULTS } from "../../constants";
import { getColumnStyles } from "../../helpers/get-column-styles";

const Column: FC<IColumn> = ({ column, fetchMore }) => {
  const { title, id, cards, totalElements } = column;
  const { isMobileOrTablet } = useResponsive();
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);

  const isTotalElements = cards?.length >= totalElements;
  const isMaxLimit = cards?.length >= HOMEWORKS_QUERY_DEFAULTS.MAX;

  const handleLoadMore = () => {
    if (isMaxLimit) {
      setHasMoreHomeworks(false);
      return;
    }
    fetchMore({
      variables: {
        offset: cards?.length,
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
  }, [cards?.length, totalElements]);

  return (
    <StyledWrapperColumnBox>
      {!isMobileOrTablet && (
        <StyledRowStack>
          <StyledTypographyStatus variant="h4">
            {getFormattedStatus(title)}
          </StyledTypographyStatus>
          <StyledTypographyCount variant="h4">
            {Number(totalElements) === 0 ? "(0)" : `(${totalElements})`}
          </StyledTypographyCount>
        </StyledRowStack>
      )}
      <StyledWrapperColumnContainer
        id={`scroll-student-container-${id}`}
        sx={{
          ...(getColumnStyles(totalElements) as {}),
        }}
      >
        <StyledInfiniteScroll
          dataLength={cards?.length}
          next={handleLoadMore}
          hasMore={hasMoreHomeworks}
          loader={
            <StyledWrapperBoxCircle>
              <CircularProgress size={20} />
            </StyledWrapperBoxCircle>
          }
          scrollableTarget={`scroll-student-container-${id}`}
        >
          {cards?.map((card, index) => (
            <StyledCardBox key={`${card.id}-${index}`}>
              <Card card={card} />
            </StyledCardBox>
          ))}
        </StyledInfiniteScroll>
      </StyledWrapperColumnContainer>
    </StyledWrapperColumnBox>
  );
};

export default Column;
