import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";
import { IBoard } from "./board.types";
import DesktopBoard from "./desktop-board";
import MobileBoard from "./mobile-board";
import useUpdateHomeworkStatus from "../../hooks/use-update-homework-status";
import { createColumnItem } from "../../helpers/create-column-item";
import { IColumnItem } from "../column/column.types";
import { STATUS_COLUMN } from "../../constants/constants";

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
  const [activeStep, setActiveStep] = useState(0);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    setColumns([
      createColumnItem(
        STATUS_COLUMN.NEW,
        StudentHomeWorkStatus.New,
        newItems as StudentHomeWorkDto[],
        newTotalElements
      ),
      createColumnItem(
        STATUS_COLUMN.IN_REVIEW,
        StudentHomeWorkStatus.InReview,
        inReviewItems as StudentHomeWorkDto[],
        inReviewTotalElements
      ),
      createColumnItem(
        STATUS_COLUMN.APPROVED,
        StudentHomeWorkStatus.Approved,
        approvedItems as StudentHomeWorkDto[],
        approvedTotalElements
      ),
      createColumnItem(
        STATUS_COLUMN.NOT_APPROVED,
        StudentHomeWorkStatus.NotApproved,
        notApprovedItems as StudentHomeWorkDto[],
        notApprovedTotalElements
      ),
    ]);
  }, [newItems, inReviewItems, approvedItems, notApprovedItems]);

  const updateStatus = useCallback(
    async (cardId: string, targetColumnId: string) => {
      switch (targetColumnId) {
        case STATUS_COLUMN.IN_REVIEW:
          await takeForReview({ variables: { homeworkId: cardId } });
          break;
        case STATUS_COLUMN.APPROVED:
          await approved({ variables: { homeWorkId: cardId } });
          break;
        case STATUS_COLUMN.NOT_APPROVED:
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

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleCardClick = (card: StudentHomeWorkDto) => {
    const shouldShowDetails = !showHomeworkDetails || card.id !== activeCardId;
    setSelectedCard(shouldShowDetails ? card : null);
    setActiveCardId(shouldShowDetails ? card.id! : null);
    setShowHomeworkDetails(shouldShowDetails);
  };

  const handleHomeworkDetailsClose = () => {
    setSelectedCard(null);
    setShowHomeworkDetails(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {isDownMd ? (
        <MobileBoard
          columns={columns}
          activeStep={activeStep}
          handleStepChange={handleStepChange}
          draggingState={draggingState}
          setDraggingState={setDraggingState}
          moveCard={moveCard}
          fetchMoreFunctions={fetchMoreFunctions}
        />
      ) : (
        <DesktopBoard
          columns={columns}
          draggingState={draggingState}
          setDraggingState={setDraggingState}
          moveCard={moveCard}
          fetchMoreFunctions={fetchMoreFunctions}
          showHomeworkDetails={showHomeworkDetails}
          isUpLg={isUpLg}
          selectedCard={selectedCard}
          handleCardClick={handleCardClick}
          activeCardId={activeCardId}
          handleHomeworkDetailsClose={handleHomeworkDetailsClose}
        />
      )}
    </DndProvider>
  );
};

export default Board;
