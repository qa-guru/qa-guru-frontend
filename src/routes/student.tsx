import { Route } from "react-router-dom";
import HomePage from "pages/home";
import { KanbanHomeworkDetailsFullPage } from "pages/kanban";
import LectureDetailPage from "pages/lecture-detail";
import TrainingLecturesPage from "pages/training-lectures";
import Profile from "pages/profile";
import TopUsersPage from "pages/top-users";
import UserDetail from "pages/user-detail";
import EditProfilePage from "pages/edit-profile";
import {
  KanbanStudentPage,
  KanbanStudentHomeworkDetailsFullPage,
} from "pages/kanban-student";

const StudentRoutes = [
  <Route key="/" path="/" element={<HomePage />} />,
  <Route
    key="training-lectures"
    path="/training/:trainingId"
    element={<TrainingLecturesPage />}
  />,
  <Route
    key="lecture"
    path="/training/:trainingId/:lectureId/:modalId?"
    element={<LectureDetailPage />}
  />,
  <Route
    key="kanban-student"
    path="/kanban-student"
    element={<KanbanStudentPage />}
  />,
  <Route
    key="kanban-homework-description"
    path="/kanban/:lectureId"
    element={<KanbanHomeworkDetailsFullPage />}
  />,
  <Route
    key="kanban-student-homework-description"
    path="/kanban-student/:lectureId"
    element={<KanbanStudentHomeworkDetailsFullPage />}
  />,
  <Route key="profile" path="/profile" element={<Profile />} />,
  <Route
    key="profile-edit"
    path="/profile/edit"
    element={<EditProfilePage />}
  />,
  <Route key="top-users" path="/top-users" element={<TopUsersPage />} />,
  <Route key="users-detail" path="/:userId" element={<UserDetail />} />,
  // <Route key="info-system" path="/info-system" element={<InfoSystemPage />} />,
];

export default StudentRoutes;
