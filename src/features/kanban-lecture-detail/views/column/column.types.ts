import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
  Maybe,
} from "api/graphql/generated/graphql";

export interface CardType {
  id: string;
  sourceColumnId: string;
  allowedColumns: string[];
}
export interface IExtendedCard extends StudentHomeWorkDto {
  allowedColumns: string[];
}

export interface IColumnItem {
  id: string;
  title: StudentHomeWorkStatus;
  cards: IExtendedCard[];
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
  onCardClick: ((card: StudentHomeWorkDto) => void) | void;
  isActive?: boolean;
  activeCardId?: Maybe<string>;
}
