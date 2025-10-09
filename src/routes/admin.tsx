import { Route } from "react-router-dom";

import AdminPanelPage from "pages/admin-panel";
import TopUsersPage from "pages/top-users";
import UserDetail from "pages/user-detail";
import EditTrainingPage from "pages/edit-training";
import EditLecturesPage from "pages/edit-lectures";
import EditLecturePage from "pages/edit-lecture";
import LectureSchedulePage from "pages/lecture-schedule";
import { KanbanPage } from "pages/kanban";
import {
  KanbanMentorHomeworkDetailsFullPage,
  KanbanMentorPage,
} from "pages/kanban-mentor";
import {
  KanbanStudentHomeworkDetailsFullPage,
  KanbanStudentPage,
} from "pages/kanban-student";
import InfoSystemPage from "pages/info-system";
import TestPage from "pages/test";
import CreateTestPage from "pages/create-test";
import TestAttemptsListPage from "pages/test-attempts-list";
import TestAttemptDetailPage from "pages/test-attempt-detail";
import TrainingLecturesPage from "pages/training-lectures";
import LectureDetailPage from "pages/lecture-detail";

const AdminRoutes = [
  <Route key="/" path="/" element={<AdminPanelPage />} />,
  <Route key="users-admin" path="/users" element={<AdminPanelPage />} />,
  <Route
    key="statistics-admin"
    path="/statistics"
    element={<AdminPanelPage />}
  />,
  <Route key="tests-admin" path="/tests" element={<AdminPanelPage />} />,
  <Route key="create-test" path="/tests/create" element={<CreateTestPage />} />,
  <Route
    key="edit-test"
    path="/tests/edit/:testId"
    element={<CreateTestPage />}
  />,
  <Route
    key="test-attempts-list"
    path="/test-attempts"
    element={<TestAttemptsListPage />}
  />,
  <Route
    key="test-attempt-detail"
    path="/test-attempts/:attemptId"
    element={<TestAttemptDetailPage />}
  />,
  <Route
    key="training-lectures"
    path="/training/:trainingId"
    element={<TrainingLecturesPage />}
  />,
  <Route
    key="lecture"
    path="/training/:trainingId/:lectureId"
    element={<LectureDetailPage />}
  />,
  <Route key="kanban" path="/kanban" element={<KanbanPage />} />,
  <Route
    key="kanban-mentor"
    path="/kanban-mentor"
    element={<KanbanMentorPage />}
  />,
  <Route
    key="kanban-mentor-homework-description"
    path="/kanban-mentor/:lectureId"
    element={<KanbanMentorHomeworkDetailsFullPage />}
  />,
  <Route
    key="kanban-student"
    path="/kanban-student"
    element={<KanbanStudentPage />}
  />,
  <Route
    key="kanban-student-homework-description"
    path="/kanban-student/:lectureId"
    element={<KanbanStudentHomeworkDetailsFullPage />}
  />,
  <Route key="top-users" path="/top-users" element={<TopUsersPage />} />,
  <Route key="users-detail" path="/:userId" element={<UserDetail />} />,
  <Route
    key="edit-training"
    path="/edit-training/:trainingId"
    element={<EditTrainingPage />}
  />,
  <Route
    key="edit-lectures"
    path="/edit-training/:trainingId/edit-lectures"
    element={<EditLecturesPage />}
  />,
  <Route
    key="edit-lecture"
    path="/edit-training/:trainingId/edit-lectures/:lectureId"
    element={<EditLecturePage />}
  />,
  <Route
    key="lecture-schedule"
    path="/edit-training/:trainingId/lecture-schedule"
    element={<LectureSchedulePage />}
  />,
  <Route key="info-system" path="/info-system" element={<InfoSystemPage />} />,
  <Route
    key="test"
    path="/test/:testId/:trainingId/:lectureId"
    element={<TestPage />}
  />,
];

export default AdminRoutes;
