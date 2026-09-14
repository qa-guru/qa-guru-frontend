import { FC, useState } from "react";
import { Container } from "@mui/material";

import BlurredHomework from "shared/components/blurred/blurred-homework/blurred-homework";
import { shouldShowLectureGate } from "shared/helpers";

import { ILectureDetail } from "./lecture-detail.types";
import LectureTitle from "../lecture-title";
import LectureDescription from "../lecture-description";
import LectureSpeakers from "../lecture-speakers";
import LectureContent from "../lecture-content";
import LectureGate from "../lecture-gate";
import { HomeworksFormProvider } from "../../context/homeworks-other-students-form-context";
import StepperButtons from "../stepper-buttons";
import HomeworkSection from "../homework-section";

const LectureDetail: FC<ILectureDetail> = (props) => {
  const {
    dataLecture,
    dataLectureHomework,
    dataTrainingLectures,
    tariffHomework,
    trainingId,
  } = props;
  const { id: lectureId, subject, description, speakers, content, testGroup } =
    dataLecture.lecture || {};
  const lectureHomeWork = dataLectureHomework?.lectureHomeWork;
  const scheduleSlot = dataTrainingLectures.trainingLectures?.find(
    (trainingLecture) => trainingLecture?.lecture?.id === lectureId
  );
  const showGate = shouldShowLectureGate(scheduleSlot, content);

  const hasHomework = !!lectureHomeWork;

  const [view, setView] = useState("kanban");

  const handleKanbanView = () => setView("kanban");
  const handleListView = () => setView("list");

  const renderHomework = () =>
    tariffHomework &&
    hasHomework && (
      <HomeworkSection
        lectureHomeWork={lectureHomeWork}
        view={view}
        onKanbanView={handleKanbanView}
        onListView={handleListView}
        testGroup={testGroup || undefined}
        trainingId={trainingId}
        lectureId={dataLecture.lecture?.id || undefined}
      />
    );

  const renderMaterials = () => {
    if (showGate) {
      return <LectureGate slot={scheduleSlot} />;
    }

    return (
      <>
        <LectureContent content={content} />
        {!tariffHomework ? <BlurredHomework /> : renderHomework()}
      </>
    );
  };

  return (
    <HomeworksFormProvider>
      <Container>
        <LectureTitle title={subject} />
        <LectureDescription description={description} />
        <LectureSpeakers speakers={speakers} />
        {renderMaterials()}
        <StepperButtons
          dataTrainingLectures={dataTrainingLectures}
          trainingId={trainingId}
        />
      </Container>
    </HomeworksFormProvider>
  );
};

export default LectureDetail;
