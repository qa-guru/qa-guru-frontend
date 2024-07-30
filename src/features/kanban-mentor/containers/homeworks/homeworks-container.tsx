import { FC, useMemo } from "react";
import { userIdVar } from "cache";
import { useReactiveVar } from "@apollo/client";

import {
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

const HomeworksContainer: FC = () => {
  const dynamicLimit = useDynamicCardLimit();
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
    variables: {
      offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
      limit: dynamicLimit,
      sort: {
        field: StudentHomeWorkSortField.CreationDate,
        order: Order.Desc,
      },
      filter: { status: StudentHomeWorkStatus.New },
    },
  });

  const {
    data: inReviewData,
    loading: inReviewLoading,
    fetchMore: fetchMoreInReview,
  } = useHomeworksQuery({
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

  if (newLoading || inReviewLoading || approvedLoading || notApprovedLoading)
    return <AppSpinner />;

  if (!newData || !inReviewData || !approvedData || !notApprovedData)
    return <NoDataErrorMessage />;

  return (
    <Board
      newData={newData}
      inReviewData={inReviewData}
      approvedData={approvedData}
      notApprovedData={notApprovedData}
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
