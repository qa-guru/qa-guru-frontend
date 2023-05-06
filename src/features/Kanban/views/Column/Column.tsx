import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { IColumn } from "./Column.types";
import Card from "../Card";
import { getColumnStyles } from "../../helpers/getColumnStyles";
import { isColumnHighlight } from "../../helpers/isColumnHighlight";

const Column: React.FC<IColumn> = ({
  column,
  onCardDrop,
  draggingState,
  setDraggingState,
  fetchMore,
}) => {
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "card",
    drop: (item: {
      id: string;
      sourceColumnId: string;
      allowedColumns: string[];
    }) => {
      if (item.allowedColumns.includes(column.id!)) {
        onCardDrop(item.id, item.sourceColumnId, column.id!);
      }
    },
    canDrop: (item: { allowedColumns: string[] }) =>
      item.allowedColumns.includes(column.id!),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        offset: column.cards?.length,
      },
      updateQuery: (
        prev: { homeWorks: { items: any } },
        { fetchMoreResult }: any
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
    if (column.cards?.length >= column.totalElements) {
      setHasMoreHomeworks(false);
    }
  }, [column.cards?.length]);

  return (
    <Box width="25%" flexGrow="1" display="flex" flexDirection="column">
      <Typography variant="h6">{column.title}</Typography>
      <Box
        id={`scroll-container-${column.id}`}
        ref={dropRef}
        flexGrow="1"
        sx={{
          ...getColumnStyles(column.id, draggingState, isOver),
          boxSizing: "border-box",
          overflowY: "auto",
          maxHeight: "600px",
          ...(isColumnHighlight(column.id, draggingState) && {
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }),
        }}
      >
        <InfiniteScroll
          dataLength={column.cards?.length}
          next={handleLoadMore}
          hasMore={hasMoreHomeworks}
          loader={
            <Box mt="10px" display="flex" justifyContent="center">
              <CircularProgress size={25} />
            </Box>
          }
          style={{ overflow: "visible" }}
          scrollableTarget={`scroll-container-${column.id}`}
        >
          {column.cards?.map((card) => (
            <Card
              key={card.id}
              card={card}
              sourceColumnId={column.id}
              setDraggingState={setDraggingState}
              isCardsHidden={isColumnHighlight(column.id, draggingState)}
            />
          ))}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default Column;
