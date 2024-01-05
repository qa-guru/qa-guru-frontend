import { Route } from "react-router-dom";
import HomePage from "pages/home";
import { KanbanPage, KanbanHomeworkDetailsFullPage } from "pages/kanban";
import LectureDetailPage from "pages/lecture-detail";
import TrainingLecturesPage from "pages/training-lectures";
import Profile from "pages/profile";
import Admin from "pages/admin";
import Top50Users from "pages/top-50-users";
import UsersPage from "pages/users";

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
  <Route key="top50users" path="/top50users" element={<Top50Users />} />,
  <Route path="/users" element={<UsersPage />} />,
];

export default AdminRoutes;
