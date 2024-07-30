import { IColumnItem } from "features/kanban/views/column/column.types";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";
import { IExtendedCard } from "shared/hooks/use-card-drop/use-card-drop.types";
import { getAllowedColumns } from "shared/helpers";

export const createColumnItem = (
  id: string,
  title: StudentHomeWorkStatus,
  items: StudentHomeWorkDto[],
  totalElements: number
): IColumnItem => {
  const extendedCards: IExtendedCard[] = items
    ?.filter((homework) => homework.status === title)
    ?.map((card) => {
      return {
        ...card,
        allowedColumns: getAllowedColumns(title),
      };
    });

  return {
    id,
    title,
    cards: extendedCards,
    totalElements,
  };
};
