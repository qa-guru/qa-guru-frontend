import React from "react";
import { useParams } from "react-router-dom";
import { useTrainingLecturesQuery } from "../../../api/graphql/trainingLecture/trainingLectures";
import Spinner from "../../../shared/Spinner/Spinner";
import TrainingLectures from "./TrainingLectures";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";

const TrainingLecturesContainer: React.FC = () => {
  const { trainingId } = useParams();
  const { data, loading } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <TrainingLectures trainingId={trainingId!} data={data} />;
};

export default TrainingLecturesContainer;
