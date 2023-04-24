import React, { useContext } from "react";
import { useHomeWorksQuery } from "../../../../api/graphql/homework/homeWorks";
import {
  Order,
  StudentHomeWorkSortField,
} from "../../../../api/graphql/generated/graphql";
import Spinner from "../../../../shared/Spinner";
import Board from "../../KanbanView/components/Board";
import { SelectedTrainingIdContext } from "../../../../context/SelectedTrainingIdContext";
import { SelectedLectureIdContext } from "../../../../context/SelectedLectureIdContext";
import { SelectedCreationDateFromContext } from "../../../../context/SelectedCreationDateFromContext";
import { SelectedCreationDateToContext } from "../../../../context/SelectedCreationDateToContext";
import { ShouldSkipHomeWorksContext } from "../../../../context/ShouldSkipHomeWorksContext";

const HomeworksContainer: React.FC = () => {
  const { selectedTrainingId } = useContext(SelectedTrainingIdContext);
  const { selectedLectureId } = useContext(SelectedLectureIdContext);
  const { selectedCreationDateFrom } = useContext(
    SelectedCreationDateFromContext
  );
  const { selectedCreationDateTo } = useContext(SelectedCreationDateToContext);
  const { shouldSkipHomeWorks } = useContext(ShouldSkipHomeWorksContext);

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const getFilterObject = () => {
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
  };

  const { data, loading } = useHomeWorksQuery({
    variables: {
      offset: 0,
      limit: 100,
      sort: {
        field: StudentHomeWorkSortField.CreationDate,
        order: Order.Asc,
      },
      filter: getFilterObject(),
    },
    skip: shouldSkipHomeWorks,
  });

  if (loading) return <Spinner />;

  return <Board data={data!} />;
};

export default HomeworksContainer;
