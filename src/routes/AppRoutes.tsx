import { Route, Routes } from "react-router-dom";
import Home from "../screens/Home/Home";
import Layout from "../shared/Layout";
import TrainingLectures from "../screens/LecturesByTraining";
import Lecture from "../screens/Lecture";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="training/:trainingId" element={<TrainingLectures />} />
        <Route path="training/:trainingId/:lectureId" element={<Lecture />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
