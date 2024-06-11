import { ReactNode } from "react";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";
import { IDraggingState } from "features/kanban/views/board/board.types";
import { type ConnectDropTarget } from "react-dnd";
import { type SxProps, type Theme } from "@mui/material/styles";

import { IExtendedCard } from "../../hooks/use-card-drop/use-card-drop.types";

export interface IColumnItem {
  id: string;
  title: StudentHomeWorkStatus;
  cards: IExtendedCard[] | StudentHomeWorkDto[];
  totalElements: number;
}

export interface IColumnContent {
  column: IColumnItem;
  fetchMore: (options: {
    variables: { offset: number };
    updateQuery: (
      prev: { homeWorks: { items: StudentHomeWorkDto[] } },
      {
        fetchMoreResult,
      }: { fetchMoreResult: { homeWorks: { items: StudentHomeWorkDto[] } } }
    ) => {
      homeWorks: {
        items: StudentHomeWorkDto[];
      };
    };
  }) => void;
  children: ReactNode;
  columnStyles?: {} | SxProps<Theme>;
  dropRef?: ConnectDropTarget;
  isOver?: boolean;
  canDrop?: boolean;
  draggingState?: IDraggingState;
}
