import { Route } from "react-router-dom";
import { KanbanPage, KanbanHomeworkDetailsFullPage } from "pages/kanban";
import Profile from "pages/profile";
import Top50Users from "pages/top-50-users";
import UsersPage from "pages/users";

const MentorRoutes = [
  <Route key="kanban" path="/kanban" element={<KanbanPage />} />,
  <Route
    key="kanban-homework-description"
    path="/kanban/:lectureId"
    element={<KanbanHomeworkDetailsFullPage />}
  />,
  <Route key="profile" path="/profile" element={<Profile />} />,
  <Route key="top50users" path="/top50users" element={<Top50Users />} />,
  <Route path="/users" element={<UsersPage />} />,
];

export default MentorRoutes;
