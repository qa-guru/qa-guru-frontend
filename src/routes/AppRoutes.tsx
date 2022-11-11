import { Routes, Route } from "react-router-dom";
import { Page404 } from "../screens/Page404/Page404";
import KanbanBoard from "../screens/KanbanBoard/KanbanBoard";
import LessonScreen from "../screens/LessonScreen/LessonScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import Admin from "../screens/Admin/Admin";
import Homework from "../screens/Homework/Homework";
import Lecture from "../screens/Lecture/Lecture";
import Home from "../screens/Home/Home";
import Training from "../screens/Training/Training";

import React from "react";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="kanban-board" element={<KanbanBoard />} />
      <Route path="lesson" element={<LessonScreen />} />
      <Route path="profile" element={<ProfileScreen />} />
      <Route path="*" element={<Page404 />} />
      <Route path="homework" element={<Homework />} />
      <Route path="lecture" element={<Lecture />} />
      <Route path="training" element={<Training />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
  );
};

export default AppRoutes;
