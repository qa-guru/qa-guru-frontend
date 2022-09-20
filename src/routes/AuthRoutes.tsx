import { Routes, Route } from "react-router-dom";
import Registration from "../screens/Registration/Registration";
import Authorization from "../screens/Authorization/Authorization";
import React from "react";
import AutoTestsGenerateForm from "../screens/AutoTestsGenerateForm/AutoTestsGenerateForm";
import { Home } from "../screens/Home/Home";
import KanbanBoard from "../screens/KanbanBoard/KanbanBoard";
import LessonScreen from "../screens/LessonScreen/LessonScreen";
import { Page404 } from "../screens/Page404/Page404";
import PracticeForm from "../screens/PracticeForm/PracticeForm";

const AuthRotes: React.FC = () => {
  return (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
      <Route path="practice-form" element={<PracticeForm />} />
      <Route path="kanban-board" element={<KanbanBoard />} />
      <Route path="autotests-generate" element={<AutoTestsGenerateForm />} />
      <Route path="lesson" element={<LessonScreen />} />
    </Routes>
  );
};

export default AuthRotes;
