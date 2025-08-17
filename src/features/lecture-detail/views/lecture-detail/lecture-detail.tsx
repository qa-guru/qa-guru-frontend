import { FC, useState } from "react";
import { Container } from "@mui/material";

import BlurredHomework from "shared/components/blurred/blurred-homework/blurred-homework";

import { ILectureDetail } from "./lecture-detail.types";
import LectureTitle from "../lecture-title";
import LectureDescription from "../lecture-description";
import LectureSpeakers from "../lecture-speakers";
import LectureContent from "../lecture-content";
import { HomeworksFormProvider } from "../../context/homeworks-other-students-form-context";
import StepperButtons from "../stepper-buttons";
import HomeworkSection from "../homework-section";
import LectureTestSection from "../lecture-test-section";

const LectureDetail: FC<ILectureDetail> = (props) => {
  const {
    dataLecture,
    dataLectureHomework,
    dataTrainingLectures,
    tariffHomework,
    trainingId,
  } = props;
  const { subject, description, speakers, content, testGroup } =
    dataLecture.lecture || {};
  const lectureHomeWork = dataLectureHomework?.lectureHomeWork;

  const hasHomework = !!lectureHomeWork;
  const hasTest = !!testGroup;

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
      />
    );

  const renderTest = () =>
    hasTest && (
      <LectureTestSection
        testGroup={testGroup}
        trainingId={trainingId}
        lectureId={dataLecture.lecture?.id || undefined}
      />
    );

  return (
    <HomeworksFormProvider>
      <Container>
        <LectureTitle title={subject} />
        <LectureDescription description={description} />
        <LectureSpeakers speakers={speakers} />
        <LectureContent content={content} />
        {renderTest()}
        {!tariffHomework ? <BlurredHomework /> : renderHomework()}
        <StepperButtons
          dataTrainingLectures={dataTrainingLectures}
          trainingId={trainingId}
        />
      </Container>
    </HomeworksFormProvider>
  );
};

export default LectureDetail;
