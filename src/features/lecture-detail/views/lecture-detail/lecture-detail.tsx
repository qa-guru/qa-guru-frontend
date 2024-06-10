import { FC, useState } from "react";
import LectureHomework from "common/lecture-homework";
import BlurredHomework from "shared/components/blurred/blurred-homework/blurred-homework";
import { Container, IconButton } from "@mui/material";
import { KanbanLecture } from "features/kanban-lecture";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Stack } from "@mui/system";
import Homework from "common/homework/container";

import { ILectureDetail } from "./lecture-detail.types";
import LectureTitle from "../lecture-title";
import LectureDescription from "../lecture-description";
import LectureSpeakers from "../lecture-speakers";
import LectureContent from "../lecture-content";
import {
  HomeworksOtherStudents,
  HomeworksOtherStudentsTotalElements,
} from "../../containers";
import { HomeworksFormProvider } from "../../context/homeworks-other-students-form-context";
import HomeworksOtherStudentsForm from "../homeworks-other-students-form";
import StepperButtons from "../stepper-buttons";

const LectureDetail: FC<ILectureDetail> = (props) => {
  const {
    dataLecture,
    dataLectureHomework,
    dataTrainingLectures,
    tariffHomework,
    trainingId,
  } = props;
  const { subject, description, speakers, content } = dataLecture.lecture || {};
  const lectureHomeWork = dataLectureHomework?.lectureHomeWork;

  const hasHomework = !!lectureHomeWork;

  const [view, setView] = useState("kanban");

  const handleKanbanView = () => setView("kanban");

  const handleListView = () => setView("list");

  return (
    <HomeworksFormProvider>
      <Container>
        <LectureTitle title={subject} />
        <LectureDescription description={description} />
        <LectureSpeakers speakers={speakers} />
        <LectureContent content={content} />
        {tariffHomework && hasHomework && (
          <>
            <LectureHomework lectureHomeWork={lectureHomeWork} />
            <Homework />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <HomeworksOtherStudentsTotalElements />
              <Stack direction="row">
                <IconButton size="small" onClick={handleKanbanView}>
                  <ViewKanbanIcon color="primary" />
                </IconButton>
                <IconButton size="small" onClick={handleListView}>
                  <ViewListIcon color="primary" />
                </IconButton>
              </Stack>
            </Stack>

            {view === "list" && (
              <>
                <HomeworksOtherStudentsForm />
                <HomeworksOtherStudents />
              </>
            )}

            {view === "kanban" && <KanbanLecture />}
          </>
        )}
        {!tariffHomework && <BlurredHomework />}
        <StepperButtons
          dataTrainingLectures={dataTrainingLectures}
          trainingId={trainingId}
        />
      </Container>
    </HomeworksFormProvider>
  );
};

export default LectureDetail;
