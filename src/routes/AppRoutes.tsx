import { Routes, Route } from "react-router-dom";
import { Page404 } from "../screens/Page404/Page404";
import PracticeForm from "../screens/PracticeForm/PracticeForm";
import KanbanBoard from "../screens/KanbanBoard/KanbanBoard";
import AutoTestsGenerateForm from "../screens/AutoTestsGenerateForm/AutoTestsGenerateForm";
import LessonScreen from "../screens/LessonScreen/LessonScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import { Home } from "../screens/Home/Home";
import Admin from "../screens/Admin/Admin";
import Homework from "../screens/Homework/Homework";
import Lecture from "../screens/Lecture/Lecture";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="practice-form" element={<PracticeForm />} />
      <Route path="kanban-board" element={<KanbanBoard />} />
      <Route path="autotests-generate" element={<AutoTestsGenerateForm />} />
      <Route path="lesson" element={<LessonScreen />} />
      <Route path="profile" element={<ProfileScreen />} />
      <Route path="admin" element={<Admin />} />
      <Route path="*" element={<Page404 />} />
      <Route path="homework" element={<Homework />} />
      <Route path="lecture" element={<Lecture />} />
    </Routes>
  );
};

export default AppRoutes;
