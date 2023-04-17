import React, { useContext } from "react";
import { useHomeWorksQuery } from "../../../../api/graphql/homework/homeWorks";
import {
  Order,
  StudentHomeWorkSortField,
} from "../../../../api/graphql/generated/graphql";
import { SelectedLectureIdContext } from "../../../../context/SelectedLectureIdContext";
import { SelectedTrainingIdContext } from "../../../../context/SelectedTrainingIdContext";
import Spinner from "../../../../shared/Spinner";
import Board from "../../KanbanView/components/Board";

const HomeworksContainer: React.FC = () => {
  const { selectedLectureId } = useContext(SelectedLectureIdContext);
  const { selectedTrainingId } = useContext(SelectedTrainingIdContext);

  const { data, loading } = useHomeWorksQuery({
    variables: {
      offset: 0,
      limit: 100,
      sort: {
        field: StudentHomeWorkSortField.CreationDate,
        order: Order.Asc,
      },
      filter: {
        lectureId: selectedLectureId,
        trainingId: selectedTrainingId,
      },
    },
  });

  if (loading) return <Spinner />;

  return <Board data={data!} />;
};

export default HomeworksContainer;
