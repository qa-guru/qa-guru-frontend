import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import SwipeableViews from "react-swipeable-views";
import { AnimatePresence, motion } from "framer-motion";
import { IBoard } from "./board.types";
import {
  StyledBox,
  StyledHomeworkDetails,
  StyledMobileWrapper,
  StyledPagination,
  StyledStack,
  StyledWrapper,
} from "./board.styled";
import Column from "../column/column";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "../../../../api/graphql/generated/graphql";
import useUpdateHomeworkStatus from "../../hooks/use-update-homework-status";
import { createColumnItem } from "../../helpers/create-column-item";
import { IColumnItem } from "../column/column.types";
import HomeworkDetails from "../homework-details/homework-details";

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
  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [showHomeworkDetails, setShowHomeworkDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState<StudentHomeWorkDto | null>(
    null
  );

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

  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardClick = (card: StudentHomeWorkDto) => {
    setSelectedCard(card);
    setShowHomeworkDetails(true);
    setActiveCardId(card.id!);
  };

  const handleHomeworkDetailsClose = () => {
    setSelectedCard(null);
    setShowHomeworkDetails(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {isDownMd ? (
        <StyledMobileWrapper>
          <StyledBox>
            <StyledPagination
              count={columns.length}
              page={activeStep + 1}
              onChange={(event, step) => handleStepChange(step - 1)}
              size="small"
              hidePrevButton
              hideNextButton
            />
          </StyledBox>
          <Box>
            <SwipeableViews
              key={activeStep}
              index={activeStep}
              onChangeIndex={handleStepChange}
              slideStyle={{
                scrollBehavior: "smooth",
              }}
            >
              {columns.map((column, index) => (
                <Column
                  draggingState={draggingState}
                  setDraggingState={setDraggingState}
                  key={`${column.id}-${index}`}
                  column={column}
                  onCardDrop={moveCard}
                  fetchMore={fetchMoreFunctions[index]}
                />
              ))}
            </SwipeableViews>
          </Box>
        </StyledMobileWrapper>
      ) : (
        <StyledWrapper>
          <motion.div
            initial={{ width: showHomeworkDetails && isUpLg ? "65%" : "100%" }}
            animate={{ width: showHomeworkDetails && isUpLg ? "65%" : "100%" }}
            transition={{ duration: 0.4 }}
          >
            <StyledStack mr={showHomeworkDetails && isUpLg ? 2 : 0}>
              {columns?.map((column, index) => (
                <Column
                  draggingState={draggingState}
                  setDraggingState={setDraggingState}
                  key={`${column.id}-${index}`}
                  column={column}
                  onCardDrop={moveCard}
                  fetchMore={fetchMoreFunctions[index]}
                  onCardClick={handleCardClick}
                  activeCardId={activeCardId}
                />
              ))}
            </StyledStack>
          </motion.div>
          <AnimatePresence>
            {isUpLg && selectedCard && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "34%" }}
                exit={{ width: "0" }}
                transition={{ duration: 0.4 }}
              >
                <StyledHomeworkDetails>
                  <HomeworkDetails
                    card={selectedCard}
                    onClose={handleHomeworkDetailsClose}
                  />
                </StyledHomeworkDetails>
              </motion.div>
            )}
          </AnimatePresence>
        </StyledWrapper>
      )}
    </DndProvider>
  );
};

export default Board;
