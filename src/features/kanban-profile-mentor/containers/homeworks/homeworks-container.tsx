import { FC, useMemo } from "react";
import {
  Order,
  StudentHomeWorkSortField,
  StudentHomeWorkStatus,
  useHomeWorksQuery,
  useUserIdQuery,
} from "api/graphql/generated/graphql";
import Spinner from "shared/components/spinners/app-spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useParams, useMatch } from "react-router-dom";

import Board from "../../views/board";
import { HOMEWORKS_QUERY_DEFAULTS } from "../../constants";

const HomeworksContainer: FC = () => {
  const { data: dataUserId } = useUserIdQuery();
  const { userId: routeUserId } = useParams<{ userId?: string }>();
  const matchProfile = useMatch("/profile");

  const filterObject = useMemo(() => {
    const mentorId = matchProfile ? dataUserId?.user?.id : routeUserId;
    return {
      mentorId,
    };
  }, [dataUserId, routeUserId, matchProfile]);

  const {
    data: newData,
    loading: newLoading,
    fetchMore: fetchMoreNew,
  } = useHomeWorksQuery({
    variables: {
      offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
      limit: HOMEWORKS_QUERY_DEFAULTS.LIMIT,
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
  } = useHomeWorksQuery({
    variables: {
      offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
      limit: HOMEWORKS_QUERY_DEFAULTS.LIMIT,
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
  } = useHomeWorksQuery({
    variables: {
      offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
      limit: HOMEWORKS_QUERY_DEFAULTS.LIMIT,
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
  } = useHomeWorksQuery({
    variables: {
      offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
      limit: HOMEWORKS_QUERY_DEFAULTS.LIMIT,
      sort: {
        field: StudentHomeWorkSortField.EndCheckingDate,
        order: Order.Desc,
      },
      filter: { ...filterObject, status: StudentHomeWorkStatus.NotApproved },
    },
  });

  if (newLoading || inReviewLoading || approvedLoading || notApprovedLoading)
    return <Spinner />;

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
