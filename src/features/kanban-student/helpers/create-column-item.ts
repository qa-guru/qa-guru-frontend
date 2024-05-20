import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";

import { IColumnItem } from "../views/column/column.types";

export const createColumnItem = (
  id: string,
  title: StudentHomeWorkStatus,
  items: StudentHomeWorkDto[],
  totalElements: number
): IColumnItem => {
  const cards = items
    ?.filter((homework) => homework.status === title)
    ?.map((card) => {
      return {
        ...card,
      };
    });

  return {
    id,
    title,
    cards,
    totalElements,
  };
};
