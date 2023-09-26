import { getAllowedColumns } from "./get-allowed-columns";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "../../../../../../../Downloads/qa-guru-frontend-develop 2/src/api/graphql/generated/graphql";
import { IColumnItem, IExtendedCard } from "../views/column/column.types";

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
