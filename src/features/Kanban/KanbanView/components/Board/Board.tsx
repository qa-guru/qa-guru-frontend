import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Stack } from "@mui/material";
import { IBoard } from "./Board.types";
import Column from "../Column/Column";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "../../../../../api/graphql/generated/graphql";
import { IColumnItem, IExtendedCard } from "../Column/Column.types";
import useUpdateHomeworkStatus from "../../../../../hooks/useUpdateHomeworkStatus";

const createColumnItem = (
  id: string,
  title: StudentHomeWorkStatus,
  items: StudentHomeWorkDto[]
): IColumnItem => {
  const cards = items.filter((homework) => homework.status === title);

  const extendedCards: IExtendedCard[] = cards.map((card) => {
    if (title === StudentHomeWorkStatus.New) {
      return { ...card, allowedColumns: ["2"] };
    } else if (title === StudentHomeWorkStatus.InReview) {
      return { ...card, allowedColumns: ["3", "4"] };
    }
    return { ...card, allowedColumns: [] };
  });

  return {
    id,
    title,
    cards: extendedCards,
  };
};

const Board: React.FC<IBoard> = ({ data }) => {
  const { items } = data?.homeWorks!;
  const { takeForReview, notApproved, approved } = useUpdateHomeworkStatus();
  const [isDraggingNewItem, setIsDraggingNewItem] = useState<boolean>(false);
  const [isDraggingFromInReview, setIsDraggingFromInReview] =
    useState<boolean>(false);

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
            isDraggingNewItem={isDraggingNewItem}
            setIsDraggingNewItem={setIsDraggingNewItem}
            isDraggingFromInReview={isDraggingFromInReview}
            setIsDraggingFromInReview={setIsDraggingFromInReview}
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
