import { Route } from "react-router-dom";
import { KanbanPage, KanbanHomeworkDetailsFullPage } from "pages/kanban";
import Profile from "pages/profile";
import UsersPage from "pages/users";
import UserDetail from "pages/user-detail";
import EditProfilePage from "pages/edit-profile";

const MentorRoutes = [
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
  <Route key="users" path="/users" element={<UsersPage />} />,
  <Route key="users-detail" path="/users/:userId" element={<UserDetail />} />,
];

export default MentorRoutes;
