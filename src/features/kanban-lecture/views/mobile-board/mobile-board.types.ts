import { IColumnItem } from "../column/column.types";

export interface IMobileBoard {
  columns: IColumnItem[];
  fetchMoreFunctions: Array<
    (options: { variables: { offset: number } }) => void
  >;
}
