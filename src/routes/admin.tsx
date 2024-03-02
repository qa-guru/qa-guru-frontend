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

const AdminRoutes = [
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
  <Route key="admin-panel" path="/admin-panel" element={<AdminPanelPage />} />,
  <Route key="top-users" path="/top-users" element={<TopUsersPage />} />,
  <Route key="users-detail" path="/:userId" element={<UserDetail />} />,
];

export default AdminRoutes;
