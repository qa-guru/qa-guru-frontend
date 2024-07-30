import { FC } from "react";
import { useParams } from "react-router-dom";

import {
  LectureDocument,
  LectureHomeWorkDocument,
  LectureQuery,
  Maybe,
  useLectureHomeWorkQuery,
  useLectureQuery,
  useUpdateLectureMutation,
} from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { FETCH_POLICY } from "shared/constants";

import EditLecture from "../../views/edit-lecture";

const EditLectureContainer: FC = () => {
  const { lectureId } = useParams();

  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: {
      id: lectureId!,
    },
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
  });

  const { data: dataLectureHomework, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId: lectureId! },
      fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
    });

  const [updateLecture, { loading: loadingUpdateLecture }] =
    useUpdateLectureMutation({
      update: (cache, { data }) => {
        const newUpdateLecture = data?.updateLecture;

        const existingLecture: Maybe<LectureQuery> = cache.readQuery({
          query: LectureDocument,
          variables: {
            id: lectureId,
          },
        });

        const updatedLecture = {
          lecture: {
            ...existingLecture?.lecture,
            ...newUpdateLecture,
          },
        };

        const updatedLectureHomeWork = {
          lectureHomeWork: newUpdateLecture?.contentHomeWork,
        };

        cache.writeQuery({
          query: LectureDocument,
          variables: {
            id: lectureId,
          },
          data: updatedLecture,
        });

        cache.writeQuery({
          query: LectureHomeWorkDocument,
          variables: { lectureId },
          data: updatedLectureHomeWork,
        });
      },
    });

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
