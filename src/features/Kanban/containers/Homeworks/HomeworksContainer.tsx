import React, { useContext, useMemo } from "react";
import { useHomeWorksQuery } from "../../../../api/graphql/homework/homeWorks";
import {
  Order,
  StudentHomeWorkSortField,
} from "../../../../api/graphql/generated/graphql";
import Spinner from "../../../../shared/Spinner";
import Board from "../../views/Board";
import { KanbanContext } from "../../context/KanbanContext";
import { isValidDate } from "../../helpers/isValidDate";

const HomeworksContainer: React.FC = () => {
  const {
    selectedLectureId,
    selectedTrainingId,
    selectedCreationDateFrom,
    selectedCreationDateTo,
    shouldSkipHomeWorks,
  } = useContext(KanbanContext);

  const filterObject = useMemo(() => {
    return {
      lectureId: selectedLectureId,
      trainingId: selectedTrainingId,
      creationDateFrom: isValidDate(selectedCreationDateFrom!)
        ? selectedCreationDateFrom
        : null,
      creationDateTo: isValidDate(selectedCreationDateTo!)
        ? selectedCreationDateTo
        : null,
    };
  }, [
    selectedLectureId,
    selectedTrainingId,
    selectedCreationDateFrom,
    selectedCreationDateTo,
  ]);

  const { data, loading } = useHomeWorksQuery({
    variables: {
      offset: 0,
      limit: 100,
      sort: {
        field: StudentHomeWorkSortField.CreationDate,
        order: Order.Asc,
      },
      filter: filterObject,
    },
    skip: shouldSkipHomeWorks,
  });

  if (loading) return <Spinner />;

  return <Board data={data!} />;
};

export default HomeworksContainer;
