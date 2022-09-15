import { Routes, Route } from "react-router-dom";
import { Home } from "../screens/Home/Home";
import { Page404 } from "../screens/Page404/Page404";
import PracticeForm from "../screens/PracticeForm/PracticeForm";
import KanbanBoard from "../screens/KanbanBoard/KanbanBoard";
import AutoTestsGenerateForm from "../screens/AutoTestsGenerateForm/AutoTestsGenerateForm";
import LessonScreen from "../screens/LessonScreen/LessonScreen";
import Registration from "../screens/Registration/Registration";
import Authorization from "../screens/Authorization/Authorization";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/authorization" element={<Authorization />} />
      <Route path="*" element={<Page404 />} />
      <Route path="practice-form" element={<PracticeForm />} />
      <Route path="kanban-board" element={<KanbanBoard />} />
      <Route path="autotests-generate" element={<AutoTestsGenerateForm />} />
      <Route path="lesson" element={<LessonScreen />} />
    </Routes>
  );
}
