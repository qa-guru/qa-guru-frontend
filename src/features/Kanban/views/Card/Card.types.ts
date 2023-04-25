import React from "react";
import { StudentHomeWorkDto } from "../../../../api/graphql/generated/graphql";
import { IDraggingState } from "../Column/Column.types";

export interface ICard {
  card: StudentHomeWorkDto;
  sourceColumnId: string;
  allowedColumns: string[];
  setDraggingState: React.Dispatch<React.SetStateAction<IDraggingState>>;
  isCardsHidden: boolean;
}
