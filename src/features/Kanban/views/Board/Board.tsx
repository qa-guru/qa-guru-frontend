import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box, useMediaQuery, Pagination, Stack } from "@mui/material";
import { useTheme } from "@mui/system";
import SwipeableViews from "react-swipeable-views";
import { IBoard } from "./Board.types";
import Column from "../Column/Column";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "../../../../api/graphql/generated/graphql";
import useUpdateHomeworkStatus from "../../hooks/useUpdateHomeworkStatus";
import { createColumnItem } from "../../helpers/createColumnItem";
import { IColumnItem } from "../Column/Column.types";

const Board: React.FC<IBoard> = ({
  newData,
  inReviewData,
  approvedData,
  notApprovedData,
  fetchMoreFunctions,
}) => {
  const { items: newItems, totalElements: newTotalElements } =
    newData.homeWorks!;
  const { items: inReviewItems, totalElements: inReviewTotalElements } =
    inReviewData.homeWorks!;
  const { items: approvedItems, totalElements: approvedTotalElements } =
    approvedData.homeWorks!;
  const { items: notApprovedItems, totalElements: notApprovedTotalElements } =
    notApprovedData.homeWorks!;
  const { takeForReview, notApproved, approved } = useUpdateHomeworkStatus();
  const [draggingState, setDraggingState] = useState({
    newItem: false,
    fromInReview: false,
    fromNotApproved: false,
  });
  const [columns, setColumns] = useState<IColumnItem[]>([]);
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setColumns([
      createColumnItem(
        "1",
        StudentHomeWorkStatus.New,
        newItems as StudentHomeWorkDto[],
        newTotalElements
      ),
      createColumnItem(
        "2",
        StudentHomeWorkStatus.InReview,
        inReviewItems as StudentHomeWorkDto[],
        inReviewTotalElements
      ),
      createColumnItem(
        "3",
        StudentHomeWorkStatus.Approved,
        approvedItems as StudentHomeWorkDto[],
        approvedTotalElements
      ),
      createColumnItem(
        "4",
        StudentHomeWorkStatus.NotApproved,
        notApprovedItems as StudentHomeWorkDto[],
        notApprovedTotalElements
      ),
    ]);
  }, [newItems, inReviewItems, approvedItems, notApprovedItems]);

  const updateStatus = useCallback(
    async (cardId: string, targetColumnId: string) => {
      switch (targetColumnId) {
        case "2":
          await takeForReview({ variables: { homeworkId: cardId } });
          break;
        case "3":
          await approved({ variables: { homeWorkId: cardId } });
          break;
        case "4":
          await notApproved({ variables: { homeWorkId: cardId } });
          break;
        default:
          break;
      }
    },
    [takeForReview, notApproved, approved]
  );

  const moveCard = useCallback(
    async (cardId: string, sourceColumnId: string, targetColumnId: string) => {
      await updateStatus(cardId, targetColumnId);
      setColumns((prevColumns) => {
        const sourceColumnIndex = prevColumns.findIndex(
          (col) => col.id === sourceColumnId
        );
        const targetColumnIndex = prevColumns.findIndex(
          (col) => col.id === targetColumnId
        );

        const sourceColumn = prevColumns[sourceColumnIndex];
        const targetColumn = prevColumns[targetColumnIndex];

        const cardIndex = sourceColumn.cards.findIndex(
          (card) => card.id === cardId
        );
        const card = sourceColumn.cards[cardIndex];

        const newSourceColumn = {
          ...sourceColumn,
          cards: sourceColumn.cards.filter((_, index) => index !== cardIndex),
        };

        const newTargetColumn = {
          ...targetColumn,
          cards: targetColumn.cards.slice(),
        };
        newTargetColumn.cards.unshift(card);

        return prevColumns.map((column, index) => {
          if (index === sourceColumnIndex) return newSourceColumn;
          if (index === targetColumnIndex) return newTargetColumn;
          return column;
        });
      });
    },
    [updateStatus]
  );

  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {isDownMd ? (
        <Box mt="15px">
          <Box display="flex" justifyContent="center">
            <Pagination
              count={columns.length}
              page={activeStep + 1}
              onChange={(event, step) => handleStepChange(step - 1)}
              color="primary"
              size="small"
              hidePrevButton
              hideNextButton
            />
          </Box>
          <Box sx={{ overflowX: "auto", scrollSnapType: "x mandatory" }}>
            <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
              {columns.map((column, index) => (
                <Column
                  draggingState={draggingState}
                  setDraggingState={setDraggingState}
                  key={column.id}
                  column={column}
                  onCardDrop={moveCard}
                  fetchMore={fetchMoreFunctions[index]}
                />
              ))}
            </SwipeableViews>
          </Box>
        </Box>
      ) : (
        <Stack
          direction="row"
          mt="15px"
          sx={{ overflowX: "auto", scrollSnapType: "x mandatory" }}
        >
          {columns.map((column, index) => (
            <Column
              draggingState={draggingState}
              setDraggingState={setDraggingState}
              key={column.id}
              column={column}
              onCardDrop={moveCard}
              fetchMore={fetchMoreFunctions[index]}
            />
          ))}
        </Stack>
      )}
    </DndProvider>
  );
};

export default Board;
