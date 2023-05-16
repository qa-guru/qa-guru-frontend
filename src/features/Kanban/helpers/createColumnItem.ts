import { getAllowedColumns } from "./getAllowedColumns";
import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "../../../api/graphql/generated/graphql";
import { IColumnItem, IExtendedCard } from "../views/Column/Column.types";

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
