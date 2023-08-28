import React, { useContext, useMemo } from "react";
import {
  Order,
  StudentHomeWorkSortField,
  StudentHomeWorkStatus,
  useHomeWorksQuery,
  useUserQuery,
} from "../../../../api/graphql/generated/graphql";
import Spinner from "../../../../shared/components/Spinner";
import Board from "../../views/Board";
import { KanbanContext } from "../../context/KanbanContext";
import { getValidDateOrNull } from "../../helpers/isValidDate";
import NoDataErrorMessage from "../../../../shared/components/NoDataErrorMessage";
import { UserProvider } from "../../context/UserContext";

const HomeworksContainer: React.FC = () => {
  const {
    selectedLectureId,
    selectedTrainingId,
    selectedCreationDateFrom,
    selectedCreationDateTo,
    selectedMentorId,
  } = useContext(KanbanContext);

  const filterObject = useMemo(() => {
    return {
      lectureId: selectedLectureId,
      trainingId: selectedTrainingId,
      creationDateFrom: getValidDateOrNull(selectedCreationDateFrom!),
      creationDateTo: getValidDateOrNull(selectedCreationDateTo!),
      mentorId: selectedMentorId,
    };
  }, [
    selectedLectureId,
    selectedTrainingId,
    selectedCreationDateFrom,
    selectedCreationDateTo,
    selectedMentorId,
  ]);

  const { data: dataUser, loading: dataLoading } = useUserQuery();

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
      limit: 4,
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
      limit: 4,
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
      limit: 4,
      sort: {
        field: StudentHomeWorkSortField.EndCheckingDate,
        order: Order.Desc,
      },
      filter: { ...filterObject, status: StudentHomeWorkStatus.NotApproved },
    },
  });

  if (
    newLoading ||
    inReviewLoading ||
    approvedLoading ||
    notApprovedLoading ||
    dataLoading
  )
    return <Spinner />;

  if (
    !newData ||
    !inReviewData ||
    !approvedData ||
    !notApprovedData ||
    !dataUser
  )
    return <NoDataErrorMessage />;

  return (
    <UserProvider userId={dataUser.user?.id} userRoles={dataUser.user?.roles}>
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
    </UserProvider>
  );
};

export default HomeworksContainer;
