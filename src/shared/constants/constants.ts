import { type WatchQueryFetchPolicy } from "@apollo/client";

import { ReactComponent as Clock } from "assets/icons/clock.svg";
import { ReactComponent as Search } from "assets/icons/search.svg";
import { ReactComponent as Done } from "assets/icons/done.svg";
import { RedHighlightOffIcon } from "shared/components/status-text/status-text";

export const DEFAULT_TIME_VALUE = 0;

export const INPUT_DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss";

export const DATE_FORMAT = "dd.MM.yyyy '|' HH:mm";

export const ROLES = [
  { text: "Админ", value: "ADMIN" },
  { text: "Преподаватель и Студент", value: "LECTOR" },
  { text: "Ментор и Студент", value: "MENTOR" },
  { text: "Студент", value: "STUDENT" },
];

export const RESPONSE_STATUS = {
  SUCCESSFUL: 200,
  UNAUTHORIZED: 401,
};

export const QUERY_DEFAULTS = {
  OFFSET: 0,
  LIMIT: 3,
};

export const PARSE_INT_RADIX = 10;

export const INDEX_OFFSET = 1;

export const STATUS_COLUMN = {
  NEW: "1",
  IN_REVIEW: "2",
  APPROVED: "3",
  NOT_APPROVED: "4",
};

export const HOMEWORKS_QUERY_DEFAULTS = {
  OFFSET: 0,
  LIMIT: 6,
  MAX: 500,
};

export const STATES = [
  {
    value: "REVIEW",
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

export const MAX_CARDS_BEFORE_SHOW_MORE = 5;

export const FETCH_POLICY: Record<string, WatchQueryFetchPolicy> = {
  CACHE_FIRST: "cache-first",
  NETWORK_ONLY: "network-only",
  CACHE_AND_NETWORK: "cache-and-network",
};

export const MIN_COMMENTS_TO_SHOW_BUTTON = 3;
