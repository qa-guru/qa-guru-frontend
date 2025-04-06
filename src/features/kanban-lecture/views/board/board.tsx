import { FC, useEffect, useState } from "react";

import {
  StudentHomeWorkDto,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";
import { useResponsive } from "shared/hooks";

import { createColumnItem } from "../../helpers/create-column-item";
import { IBoard } from "./board.types";
import DesktopBoard from "../desktop-board";
import MobileBoard from "../mobile-board";
import { IColumnItem } from "../column/column.types";
import { STATUS_COLUMN } from "../../constants";

const Board: FC<IBoard> = ({
  newData,
  inReviewData,
  approvedData,
  notApprovedData,
  fetchMoreFunctions,
}) => {
  const { items: newItems, totalElements: newTotalElements } =
    newData?.homeWorks || {};
  const { items: inReviewItems, totalElements: inReviewTotalElements } =
    inReviewData?.homeWorks || {};
  const { items: approvedItems, totalElements: approvedTotalElements } =
    approvedData?.homeWorks || {};
  const { items: notApprovedItems, totalElements: notApprovedTotalElements } =
    notApprovedData?.homeWorks || {};
  const [columns, setColumns] = useState<IColumnItem[]>([]);
  const { isMobileOrTablet } = useResponsive();

  useEffect(() => {
    setColumns([
      createColumnItem(
        STATUS_COLUMN.NEW,
        StudentHomeWorkStatus.Review,
        newItems as StudentHomeWorkDto[],
        newTotalElements
      ),
      createColumnItem(
        STATUS_COLUMN.IN_REVIEW,
        StudentHomeWorkStatus.InReview,
        inReviewItems as StudentHomeWorkDto[],
        inReviewTotalElements
      ),
      createColumnItem(
        STATUS_COLUMN.APPROVED,
        StudentHomeWorkStatus.Approved,
        approvedItems as StudentHomeWorkDto[],
        approvedTotalElements
      ),
      createColumnItem(
        STATUS_COLUMN.NOT_APPROVED,
        StudentHomeWorkStatus.NotApproved,
        notApprovedItems as StudentHomeWorkDto[],
        notApprovedTotalElements
      ),
    ]);
  }, [newItems, inReviewItems, approvedItems, notApprovedItems]);

  return (
    <>
      {isMobileOrTablet ? (
        <MobileBoard
          columns={columns}
          fetchMoreFunctions={fetchMoreFunctions}
        />
      ) : (
        <DesktopBoard
          columns={columns}
          fetchMoreFunctions={fetchMoreFunctions}
        />
      )}
    </>
  );
};

export default Board;
