import { Route } from "react-router-dom";
import { KanbanPage, KanbanHomeworkDetailsFullPage } from "pages/kanban";
import Profile from "pages/profile";

const MentorRoutes = [
  <Route key="kanban" path="/kanban" element={<KanbanPage />} />,
  <Route
    key="kanban-homework-description"
    path="/kanban/:lectureId"
    element={<KanbanHomeworkDetailsFullPage />}
  />,
  <Route key="profile" path="/profile" element={<Profile />} />,
];

export default MentorRoutes;
