import React, { useContext, useMemo } from "react";
import { useHomeWorksQuery } from "../../../../api/graphql/homework/homeWorks";
import {
  Order,
  StudentHomeWorkSortField,
  StudentHomeWorkStatus,
} from "../../../../api/graphql/generated/graphql";
import Spinner from "../../../../shared/Spinner";
import Board from "../../views/Board";
import { KanbanContext } from "../../context/KanbanContext";
import { getValidDateOrNull } from "../../helpers/isValidDate";

const HomeworksContainer: React.FC = () => {
  const {
    selectedLectureId,
    selectedTrainingId,
    selectedCreationDateFrom,
    selectedCreationDateTo,
  } = useContext(KanbanContext);

  const filterObject = useMemo(() => {
    return {
      lectureId: selectedLectureId,
      trainingId: selectedTrainingId,
      creationDateFrom: getValidDateOrNull(selectedCreationDateFrom!),
      creationDateTo: getValidDateOrNull(selectedCreationDateTo!),
    };
  }, [
    selectedLectureId,
    selectedTrainingId,
    selectedCreationDateFrom,
    selectedCreationDateTo,
  ]);

  const {
    data: newData,
    loading: newLoading,
    fetchMore: fetchMoreNew,
  } = useHomeWorksQuery({
    variables: {
      offset: 0,
      limit: 4,
      sort: {
        field: StudentHomeWorkSortField.CreationDate,
        order: Order.Asc,
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
      limit: 4,
      sort: {
        field: StudentHomeWorkSortField.CreationDate,
        order: Order.Asc,
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
      limit: 4,
      sort: {
        field: StudentHomeWorkSortField.CreationDate,
        order: Order.Asc,
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
      limit: 4,
      sort: {
        field: StudentHomeWorkSortField.CreationDate,
        order: Order.Asc,
      },
      filter: { ...filterObject, status: StudentHomeWorkStatus.NotApproved },
    },
  });

  if (newLoading || inReviewLoading || approvedLoading || notApprovedLoading)
    return <Spinner />;

  return (
    <Board
      newData={newData!}
      inReviewData={inReviewData!}
      approvedData={approvedData!}
      notApprovedData={notApprovedData!}
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
