import { Route } from "react-router-dom";

import { KanbanPage, KanbanHomeworkDetailsFullPage } from "pages/kanban";
import LectureDetailPage from "pages/lecture-detail";
import TrainingLecturesPage from "pages/training-lectures";
import Profile from "pages/profile";
import AdminPanelPage from "pages/admin-panel";
import TopUsersPage from "pages/top-users";
import UserDetail from "pages/user-detail";
import EditProfilePage from "pages/edit-profile";
import EditTrainingPage from "pages/edit-training";
import EditLecturesPage from "pages/edit-lectures";
import EditLecturePage from "pages/edit-lecture";
import ScrollPageSectionPage from "pages/scroll-page-section";
import {
  KanbanMentorHomeworkDetailsFullPage,
  KanbanMentorPage,
} from "pages/kanban-mentor";
import {
  KanbanStudentHomeworkDetailsFullPage,
  KanbanStudentPage,
} from "pages/kanban-student";
import InfoSystemPage from "pages/info-system";

const AdminRoutes = [
  <Route key="/" path="/" element={<AdminPanelPage />} />,
  <Route key="users-admin" path="/users" element={<AdminPanelPage />} />,
  <Route
    key="statistics-admin"
    path="/statistics"
    element={<AdminPanelPage />}
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
  <Route
    key="kanban-homework-description"
    path="/kanban/:lectureId"
    element={<KanbanHomeworkDetailsFullPage />}
  />,
  <Route key="profile" path="/profile" element={<Profile />} />,
  <Route
    key="profile-edit"
    path="/profile/edit"
    element={<EditProfilePage />}
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
  <Route key="info-system" path="/info-system" element={<InfoSystemPage />} />,
  <Route
    key="scroll-page-section"
    path="/scroll-page-section"
    element={<ScrollPageSectionPage />}
  />,
];

export default AdminRoutes;
