import { Route } from "react-router-dom";
import { KanbanPage, KanbanHomeworkDetailsFullPage } from "pages/kanban";

const MentorRoutes = [
  <Route key="kanban" path="/kanban" element={<KanbanPage />} />,
  <Route
    key="kanban-homework-description"
    path="/kanban/:lectureId"
    element={<KanbanHomeworkDetailsFullPage />}
  />,
];

export default MentorRoutes;
