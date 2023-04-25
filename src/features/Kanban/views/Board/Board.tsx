import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Stack } from "@mui/material";
import { IBoard } from "./Board.types";
import Column from "../Column/Column";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "../../../../api/graphql/generated/graphql";
import { IColumnItem } from "../Column/Column.types";
import useUpdateHomeworkStatus from "../../../LectureDetail/hooks/useUpdateHomeworkStatus";
import { createColumnItem } from "../../helpers/createColumnItem";

const Board: React.FC<IBoard> = ({ data }) => {
  const { items } = data?.homeWorks || {};
  const { takeForReview, notApproved, approved } = useUpdateHomeworkStatus();
  const [draggingState, setDraggingState] = useState({
    newItem: false,
    fromInReview: false,
  });

  const [columns, setColumns] = useState<IColumnItem[]>([
    createColumnItem(
      "1",
      StudentHomeWorkStatus.New,
      items as StudentHomeWorkDto[]
    ),
    createColumnItem(
      "2",
      StudentHomeWorkStatus.InReview,
      items as StudentHomeWorkDto[]
    ),
    createColumnItem(
      "3",
      StudentHomeWorkStatus.Approved,
      items as StudentHomeWorkDto[]
    ),
    createColumnItem(
      "4",
      StudentHomeWorkStatus.NotApproved,
      items as StudentHomeWorkDto[]
    ),
  ]);

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
          cards: [...targetColumn.cards, card],
        };

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
      <Stack direction="row" spacing={2} mt="20px">
        {columns?.map((column) => (
          <Column
            draggingState={draggingState}
            setDraggingState={setDraggingState}
            key={column.id}
            column={column}
            onCardDrop={moveCard}
          />
        ))}
      </Stack>
    </DndProvider>
  );
};

export default Board;
