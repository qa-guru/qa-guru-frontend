import { FC } from "react";
import LectureHomework from "shared/features/lecture-homework";
import Homework from "shared/features/homework/container";
import { KanbanLecture } from "features/kanban-lecture";
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
}) => {
  const hasHomework = lectureHomeWork?.length > 0;

  return (
    <>
      {hasHomework && (
        <>
          <LectureHomework lectureHomeWork={lectureHomeWork} />
          <Homework />
          <HomeworksViewSwitcher
            onKanbanView={onKanbanView}
            onListView={onListView}
          />
          {view === "list" && (
            <>
              <HomeworksOtherStudentsForm />
              <HomeworksOtherStudents />
            </>
          )}
          {view === "kanban" && <KanbanLecture />}
        </>
      )}
      {!hasHomework && <BlurredHomework />}
    </>
  );
};

export default HomeworkSection;
