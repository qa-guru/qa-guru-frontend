import { FC } from "react";
import { useParams } from "react-router-dom";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useLectureHomeWorkQuery,
  useLectureQuery,
} from "api/graphql/generated/graphql";
import LectureDetail from "../../views";
import useTariff from "../../hooks/use-tariff";
import { LectureIdContext } from "../../context/lecture-id-context";

const LectureDetailContainer: FC = () => {
  const { lectureId, trainingId } = useParams();

  const { tariffHomework } = useTariff({ trainingId });

  if (!lectureId) return <NoDataErrorMessage />;

  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: { id: lectureId },
  });

  const { data: dataLectureHomework, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId },
      skip: !tariffHomework,
    });

  if (!dataLecture) return <NoDataErrorMessage />;

  if (loadingLecture || loadingLectureHomeWork) return <Spinner />;

  return (
    <LectureIdContext.Provider value={lectureId}>
      <LectureDetail
        dataLecture={dataLecture}
        dataLectureHomework={dataLectureHomework!}
        tariffHomework={tariffHomework}
      />
    </LectureIdContext.Provider>
  );
};

export default LectureDetailContainer;
