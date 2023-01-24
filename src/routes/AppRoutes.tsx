import { Route, Routes } from "react-router-dom";
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
      </Route>
    </Routes>
  );
};

export default AppRoutes;
