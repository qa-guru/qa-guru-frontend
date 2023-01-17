import { Route, Routes } from "react-router-dom";
import { Page404 } from "../screens/Page404/Page404";
import KanbanBoard from "../screens/KanbanBoard/KanbanBoard";
import Home from "../screens/Home/Home";
import LessonsByTraining from "../screens/LessonsByTraining /LessonsByTraining";
import Layout from "../layout/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="training/:trainingId" element={<LessonsByTraining />} />
        {/*<Route path="training/:trainingId/:lessonId" element={<LessonDetail />} />*/}
        <Route path="kanban-board" element={<KanbanBoard />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
