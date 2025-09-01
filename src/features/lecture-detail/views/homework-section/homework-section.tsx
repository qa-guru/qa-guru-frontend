import { FC } from "react";

import { KanbanLecture } from "features/kanban-lecture";
import LectureHomework from "shared/features/lecture-homework";
import Homework from "shared/features/homework/container";
import BlurredHomework from "shared/components/blurred/blurred-homework";

import HomeworksViewSwitcher from "../homeworks-view-switcher";
import HomeworksOtherStudentsForm from "../homeworks-other-students-form";
import { HomeworksOtherStudents } from "../../containers";
import { IHomeworkSection } from "./homework-section.types";

const HomeworkSection: FC<IHomeworkSection> = ({
  lectureHomeWork,
  view,
  onKanbanView,
  onListView,
  testGroup,
  trainingId,
  lectureId,
}) => {
  const hasHomework = lectureHomeWork?.length > 0;

  const renderListView = () =>
    view === "list" && (
      <>
        <HomeworksOtherStudentsForm />
        <HomeworksOtherStudents />
      </>
    );
  const renderKanbanView = () => view === "kanban" && <KanbanLecture />;

  const homework = (
    <>
      <LectureHomework lectureHomeWork={lectureHomeWork} />
      <Homework
        testGroup={testGroup}
        trainingId={trainingId}
        lectureId={lectureId}
      />
      <HomeworksViewSwitcher
        onKanbanView={onKanbanView}
        onListView={onListView}
      />
      {renderListView()}
      {renderKanbanView()}
    </>
  );

  return hasHomework ? homework : <BlurredHomework />;
};

export default HomeworkSection;
