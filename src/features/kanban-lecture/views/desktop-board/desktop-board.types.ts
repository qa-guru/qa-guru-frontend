import { IColumnItem } from "../column/column.types";

export interface IDesktopBoard {
  columns: IColumnItem[];
  fetchMoreFunctions: Array<
    (options: { variables: { offset: number } }) => void
  >;
}
