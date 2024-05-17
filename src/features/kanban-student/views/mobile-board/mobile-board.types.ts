import { ReactComponent as Clock } from "assets/icons/clock.svg";
import { ReactComponent as Search } from "assets/icons/search.svg";
import { ReactComponent as Done } from "assets/icons/done.svg";
import { RedHighlightOffIcon } from "shared/components/status-text/status-text";

import { IColumnItem } from "../column/column.types";

export interface IMobileBoard {
  columns: IColumnItem[];
  fetchMoreFunctions: Array<
    (options: { variables: { offset: number } }) => void
  >;
}

export const states = [
  {
    value: "NEW",
    Icon: Clock,
    text: "Новые",
  },
  {
    value: "IN_REVIEW",
    Icon: Search,
    text: "На проверке",
  },
  {
    value: "APPROVED",
    Icon: Done,
    text: "Принято",
  },
  {
    value: "NOT_APPROVED",
    Icon: RedHighlightOffIcon,
    text: "Не принято",
  },
];
