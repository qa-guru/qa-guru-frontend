import { Route } from "react-router-dom";
import HomePage from "pages/home";
import { KanbanPage, KanbanHomeworkDetailsFullPage } from "pages/kanban";
import LectureDetailPage from "pages/lecture-detail";
import TrainingLecturesPage from "pages/training-lectures";
import Profile from "pages/profile";
import Admin from "pages/admin";
import UsersPage from "pages/users";
import UserDetail from "pages/user-detail";

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
  <Route key="admin" path="/admin" element={<Admin />} />,
  <Route key="users" path="/users" element={<UsersPage />} />,
  <Route key="users-detail" path="/users/:userId" element={<UserDetail />} />,
];

export default AdminRoutes;
