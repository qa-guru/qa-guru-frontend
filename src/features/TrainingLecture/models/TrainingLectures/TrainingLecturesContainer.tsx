import React from "react";
import { useParams } from "react-router-dom";
import { useTrainingLecturesQuery } from "../../../../api/graphql/trainingLecture/trainingLectures";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import TrainingLectures from "./TrainingLectures";

const TrainingLecturesContainer: React.FC = () => {
  const { trainingId } = useParams();
  const { data, loading } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
  });

  if (loading && !data) return <Spinner />;

  return <TrainingLectures trainingId={trainingId!} data={data!} />;
};

export default TrainingLecturesContainer;
