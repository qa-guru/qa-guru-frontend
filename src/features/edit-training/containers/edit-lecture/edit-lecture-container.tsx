import { FC } from "react";
import {
  useLectureHomeWorkQuery,
  useLectureQuery,
  useUpdateLectureMutation,
} from "api/graphql/generated/graphql";
import { useParams } from "react-router-dom";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import EditLecture from "../../views/edit-lecture";

const EditLectureContainer: FC = () => {
  const { lectureId } = useParams();

  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: {
      id: lectureId!,
    },
  });

  const { data: dataLectureHomework, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId: lectureId! },
    });

  const [updateLecture, { loading: loadingUpdateLecture }] =
    useUpdateLectureMutation();

  if (loadingUpdateLecture || loadingLecture || loadingLectureHomeWork)
    return <AppSpinner />;
  if (!dataLectureHomework || !dataLecture) return <NoDataErrorMessage />;

  return (
    <EditLecture
      dataLectureHomework={dataLectureHomework}
      dataLecture={dataLecture}
      updateLecture={updateLecture}
    />
  );
};

export default EditLectureContainer;
