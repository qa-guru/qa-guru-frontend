import { Route } from "react-router-dom";
import { KanbanHomeworkDetailsFullPage, KanbanPage } from "pages/kanban";
import Profile from "pages/profile";
import TopUsersPage from "pages/top-users";
import UserDetail from "pages/user-detail";
import EditProfilePage from "pages/edit-profile";
import {
  KanbanMentorPage,
  KanbanMentorHomeworkDetailsFullPage,
} from "pages/kanban-mentor";

const MentorRoutes = [
  <Route key="kanban" path="/kanban" element={<KanbanPage />} />,
  <Route
    key="kanban-mentor"
    path="/kanban-mentor"
    element={<KanbanMentorPage />}
  />,
  <Route
    key="kanban-homework-description"
    path="/kanban/:lectureId"
    element={<KanbanHomeworkDetailsFullPage />}
  />,
  <Route
    key="kanban-mentor-homework-description"
    path="/kanban-mentor/:lectureId"
    element={<KanbanMentorHomeworkDetailsFullPage />}
  />,
  <Route key="profile" path="/profile" element={<Profile />} />,
  <Route
    key="profile-edit"
    path="/profile/edit"
    element={<EditProfilePage />}
  />,
  <Route key="top-users" path="/top-users" element={<TopUsersPage />} />,
  <Route key="users-detail" path="/:userId" element={<UserDetail />} />,
];

export default MentorRoutes;
