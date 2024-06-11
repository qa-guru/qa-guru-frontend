import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
  Maybe,
} from "api/graphql/generated/graphql";
import { MouseEvent } from "react";

export interface IColumnItem {
  id: string;
  title: StudentHomeWorkStatus;
  cards: StudentHomeWorkDto[];
  totalElements: number;
}

export interface IColumn {
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
  column: IColumnItem;
  onCardClick?: (
    card: StudentHomeWorkDto,
    event: MouseEvent<HTMLDivElement>
  ) => void;
  activeCardId?: Maybe<string>;
}
