import React from "react";
import { Route } from "react-router-dom";
import { UserRole } from "../api/graphql/generated/graphql";
import Home from "../screens/Home";
import TrainingLectures from "../screens/LecturesByTraining";
import Lecture from "../screens/Lecture";
import Kanban from "../features/Kanban/views/Kanban";

const StudentRoutes: React.ReactNode[] = [
  <Route key="/" path="/" element={<Home />} />,
  <Route
    key="training-lectures"
    path="/training/:trainingId"
    element={<TrainingLectures />}
  />,
  <Route
    key="lecture"
    path="/training/:trainingId/:lectureId"
    element={<Lecture />}
  />,
];

const MentorRoutes: React.ReactNode[] = [
  <Route key="kanban" path="/kanban" element={<Kanban />} />,
];

const ManagerRoutes: React.ReactNode[] = [
  <Route key="kanban" path="/kanban" element={<Kanban />} />,
];

export const getUserRoutes = (userRoles: Array<UserRole | null>) => {
  return userRoles.reduce((acc, role) => {
    if (role && roleRoutes[role]) {
      return [...acc, ...(roleRoutes[role] as React.ReactNode[])];
    }
    return acc;
  }, [] as React.ReactNode[]);
};

export const roleRoutes: { [key in UserRole]?: React.ReactNode[] } = {
  [UserRole.Student]: StudentRoutes,
  [UserRole.Mentor]: MentorRoutes,
  [UserRole.Manager]: ManagerRoutes,
};
