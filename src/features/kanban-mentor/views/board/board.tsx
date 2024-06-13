import { FC, useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";
import { useResponsive } from "shared/hooks";
import { createColumnItem } from "shared/helpers";

import { IBoard } from "./board.types";
import DesktopBoard from "../desktop-board";
import MobileBoard from "../mobile-board";
import { IColumnItem } from "../column/column.types";
import useUpdateHomeworkStatus from "../../hooks/use-update-homework-status";
import { STATUS_COLUMN } from "../../constants";

const Board: FC<IBoard> = ({
  newData,
  inReviewData,
  approvedData,
  notApprovedData,
  fetchMoreFunctions,
}) => {
  const { items: newItems, totalElements: newTotalElements } =
    newData?.homeWorks || {};
  const { items: inReviewItems, totalElements: inReviewTotalElements } =
    inReviewData?.homeWorks || {};
  const { items: approvedItems, totalElements: approvedTotalElements } =
    approvedData?.homeWorks || {};
  const { items: notApprovedItems, totalElements: notApprovedTotalElements } =
    notApprovedData?.homeWorks || {};

  const { takeForReview, notApproved, approved, notApprovedToApproved } =
    useUpdateHomeworkStatus();
  const [draggingState, setDraggingState] = useState({
    newItem: false,
    fromInReview: false,
    fromNotApproved: false,
  });
  const [columns, setColumns] = useState<IColumnItem[]>([]);
  const { isMobileOrTablet } = useResponsive();

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
    async (cardId: string, sourceColumnId: string, targetColumnId: string) => {
      switch (targetColumnId) {
        case STATUS_COLUMN.IN_REVIEW:
          await takeForReview({ variables: { homeworkId: cardId } });
          break;
        case STATUS_COLUMN.APPROVED:
          if (sourceColumnId === STATUS_COLUMN.NOT_APPROVED) {
            await notApprovedToApproved({ variables: { homeWorkId: cardId } });
          } else {
            await approved({ variables: { homeWorkId: cardId } });
          }
          break;
        case STATUS_COLUMN.NOT_APPROVED:
          await notApproved({ variables: { homeWorkId: cardId } });
          break;
        default:
          break;
      }
    },
    [takeForReview, notApproved, approved, notApprovedToApproved]
  );

  const moveCard = useCallback(
    async (cardId: string, sourceColumnId: string, targetColumnId: string) => {
      await updateStatus(cardId, sourceColumnId, targetColumnId);
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

  return (
    <DndProvider backend={HTML5Backend}>
      {isMobileOrTablet ? (
        <MobileBoard
          columns={columns}
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
        />
      )}
    </DndProvider>
  );
};

export default Board;
