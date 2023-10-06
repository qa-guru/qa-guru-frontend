import React, { useContext, useMemo } from "react";
import {
  Order,
  StudentHomeWorkSortField,
  StudentHomeWorkStatus,
  useHomeWorksQuery,
} from "api/graphql/generated/graphql";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import Board from "../../views/board";
import { KanbanFormContext } from "../../context/kanban-form-context";

const HomeworksContainer: React.FC = () => {
  const { trainingId, lectureId, creationDateFrom, creationDateTo, mentorId } =
    useContext(KanbanFormContext);

  const filterObject = useMemo(() => {
    return {
      trainingId,
      lectureId,
      mentorId,
      creationDateFrom: creationDateFrom!,
      creationDateTo: creationDateTo!,
    };
  }, [trainingId, lectureId, mentorId, creationDateFrom, creationDateTo]);

  const {
    data: newData,
    loading: newLoading,
    fetchMore: fetchMoreNew,
  } = useHomeWorksQuery({
    variables: {
      offset: 0,
      limit: 5,
      sort: {
        field: StudentHomeWorkSortField.CreationDate,
        order: Order.Desc,
      },
      filter: { ...filterObject, status: StudentHomeWorkStatus.New },
    },
  });

  const {
    data: inReviewData,
    loading: inReviewLoading,
    fetchMore: fetchMoreInReview,
  } = useHomeWorksQuery({
    variables: {
      offset: 0,
      limit: 5,
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
      offset: 0,
      limit: 5,
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
      offset: 0,
      limit: 5,
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
