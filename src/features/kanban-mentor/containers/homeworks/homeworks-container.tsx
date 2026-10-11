import { FC, useEffect, useMemo } from "react";
import { useApolloClient, useReactiveVar } from "@apollo/client";

import { userIdVar } from "cache";
import {
  ContourCheckVerdict,
  HomeworksDocument,
  Order,
  StudentHomeWorkSortField,
  StudentHomeWorkStatus,
  useHomeworksQuery,
} from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useDynamicCardLimit } from "shared/hooks";

import Board from "../../views/board";
import { HOMEWORKS_QUERY_DEFAULTS } from "../../constants";

const refreshOptions = {
  fetchPolicy: "cache-and-network" as const,
  pollInterval: 15_000,
};

const HomeworksContainer: FC = () => {
  const client = useApolloClient();
  const dynamicLimit = useDynamicCardLimit();

  useEffect(() => {
    const refresh = () => {
      client
        .refetchQueries({ include: [HomeworksDocument] })
        .catch(() => undefined);
    };
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [client]);
  const currentUserId = useReactiveVar(userIdVar);

  const filterObject = useMemo(() => {
    return {
      mentorId: currentUserId,
    };
  }, [currentUserId]);

  const {
    data: newData,
    loading: newLoading,
    fetchMore: fetchMoreNew,
  } = useHomeworksQuery({
    ...refreshOptions,
    variables: {
      offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
      limit: dynamicLimit,
      sort: {
        field: StudentHomeWorkSortField.CreationDate,
        order: Order.Desc,
      },
      filter: { status: StudentHomeWorkStatus.Review },
    },
  });

  const {
    data: inReviewData,
    loading: inReviewLoading,
    fetchMore: fetchMoreInReview,
  } = useHomeworksQuery({
    ...refreshOptions,
    variables: {
      offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
      limit: dynamicLimit,
      sort: {
        field: StudentHomeWorkSortField.StartCheckingDate,
        order: Order.Desc,
      },
      filter: { ...filterObject, status: StudentHomeWorkStatus.InReview },
    },
  });

  const {
    data: approvedData,
    loading: approvedLoading,
    fetchMore: fetchMoreApproved,
  } = useHomeworksQuery({
    ...refreshOptions,
    variables: {
      offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
      limit: dynamicLimit,
      sort: {
        field: StudentHomeWorkSortField.EndCheckingDate,
        order: Order.Desc,
      },
      filter: { ...filterObject, status: StudentHomeWorkStatus.Approved },
    },
  });

  const {
    data: notApprovedData,
    loading: notApprovedLoading,
    fetchMore: fetchMoreNotApproved,
  } = useHomeworksQuery({
    ...refreshOptions,
    variables: {
      offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
      limit: dynamicLimit,
      sort: {
        field: StudentHomeWorkSortField.EndCheckingDate,
        order: Order.Desc,
      },
      filter: { ...filterObject, status: StudentHomeWorkStatus.NotApproved },
    },
  });

  // Contour auto-rejected homeworks are unbound (mentor=null) and fall out of
  // the mentor-scoped column — pull them separately and merge in.
  const { data: contourRejectedData } = useHomeworksQuery({
    ...refreshOptions,
    variables: {
      offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
      limit: dynamicLimit,
      sort: {
        field: StudentHomeWorkSortField.EndCheckingDate,
        order: Order.Desc,
      },
      filter: { status: StudentHomeWorkStatus.NotApproved },
    },
  });

  if (!newData || !inReviewData || !approvedData || !notApprovedData) {
    return newLoading ||
      inReviewLoading ||
      approvedLoading ||
      notApprovedLoading ? (
      <AppSpinner />
    ) : (
      <NoDataErrorMessage />
    );
  }

  const notApprovedItems = notApprovedData.homeWorks?.items ?? [];
  const seen = new Set(notApprovedItems.map((item) => item?.id));
  const contourExtras = (contourRejectedData?.homeWorks?.items ?? []).filter(
    (item) =>
      item &&
      !item.mentor &&
      item.contourCheckVerdict === ContourCheckVerdict.Rejected &&
      !seen.has(item.id)
  );
  const notApprovedMerged = {
    ...notApprovedData,
    homeWorks: {
      ...notApprovedData.homeWorks,
      items: [...notApprovedItems, ...contourExtras].sort((a, b) =>
        String(b?.endCheckingDate ?? "").localeCompare(
          String(a?.endCheckingDate ?? "")
        )
      ),
      totalElements:
        notApprovedData.homeWorks!.totalElements + contourExtras.length,
    },
  };

  return (
    <Board
      newData={newData}
      inReviewData={inReviewData}
      approvedData={approvedData}
      notApprovedData={notApprovedMerged}
      fetchMoreFunctions={[
        fetchMoreNew,
        fetchMoreInReview,
        fetchMoreApproved,
        fetchMoreNotApproved,
      ]}
    />
  );
};

export default HomeworksContainer;
