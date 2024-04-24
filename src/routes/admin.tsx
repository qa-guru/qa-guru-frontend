import { Route } from "react-router-dom";
import HomePage from "pages/home";
import { KanbanPage, KanbanHomeworkDetailsFullPage } from "pages/kanban";
import LectureDetailPage from "pages/lecture-detail";
import TrainingLecturesPage from "pages/training-lectures";
import Profile from "pages/profile";
import AdminPanelPage from "pages/admin-panel";
import TopUsersPage from "pages/top-users";
import UserDetail from "pages/user-detail";
import EditProfilePage from "pages/edit-profile";
import CreateTrainingPage from "pages/create-training";
import EditTrainingPage from "pages/edit-training";

const AdminRoutes = [
  <Route key="/" path="/" element={<HomePage />} />,
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
  <Route
    key="courses-admin"
    path="/admin-panel/courses"
    element={<AdminPanelPage />}
  />,
  <Route
    key="users-admin"
    path="/admin-panel/users"
    element={<AdminPanelPage />}
  />,
  <Route
    key="statistics-admin"
    path="/admin-panel/statistics"
    element={<AdminPanelPage />}
  />,
  <Route key="top-users" path="/top-users" element={<TopUsersPage />} />,
  <Route key="users-detail" path="/:userId" element={<UserDetail />} />,
  <Route
    key="create-training"
    path="/admin-panel/courses/create-training"
    element={<CreateTrainingPage />}
  />,
  <Route
    key="edit-training"
    path="/admin-panel/courses/edit-training/:courseId"
    element={<EditTrainingPage />}
  />,
];

export default AdminRoutes;
