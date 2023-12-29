import { ReactComponent as Clock } from "assets/icons/clock.svg";
import { ReactComponent as Search } from "assets/icons/search.svg";
import { ReactComponent as Done } from "assets/icons/done.svg";
import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";

import { RedHighlightOffIcon } from "../../../../shared/components/status-text/status-text";

export interface IStatusSelect {
  currentStatus?: StudentHomeWorkStatus | null;
  homeworkId?: string | null;
}

export const states = [
  {
    value: "NEW",
    Icon: Clock,
    text: "Ожидает проверки",
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
