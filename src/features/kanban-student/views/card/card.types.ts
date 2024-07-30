import { MouseEvent } from "react";

import { StudentHomeWorkDto } from "api/graphql/generated/graphql";

export interface ICard {
  card: StudentHomeWorkDto;
  onCardClick?: (event: MouseEvent<HTMLDivElement>) => void;
  isActive?: boolean;
}
