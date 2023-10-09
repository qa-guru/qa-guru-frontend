import React from "react";
import { IColumnItem } from "../../column/column.types";

export interface IMobileBoard {
  columns: IColumnItem[];
  activeStep: number;
  handleStepChange: (step: number) => void;
  draggingState: {
    newItem: boolean;
    fromInReview: boolean;
    fromNotApproved: boolean;
  };
  setDraggingState: React.Dispatch<
    React.SetStateAction<{
      newItem: boolean;
      fromInReview: boolean;
      fromNotApproved: boolean;
    }>
  >;
  moveCard: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => Promise<void>;
  fetchMoreFunctions: Array<
    (options: { variables: { offset: number } }) => void
  >;
}
