import { Route, Routes } from "react-router-dom";
import { Page404 } from "../screens/Page404/Page404";
import Home from "../screens/Home/Home";
import Layout from "../layout/Layout";
import TrainingLectures from "../screens/LecturesByTraining/LecturesByTraining";
import Lecture from "../screens/Lecture/Lecture";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="training/:trainingId" element={<TrainingLectures />} />
        <Route path="training/:trainingId/:lessonId" element={<Lecture />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
