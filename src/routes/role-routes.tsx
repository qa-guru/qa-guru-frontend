import React from "react";
import { Route } from "react-router-dom";
import { UserRole } from "api/graphql/generated/graphql";
import TrainingLectures from "screens/lectures-by-training";
import Lecture from "screens/lecture";
import Kanban from "features/kanban/views/kanban";
import Home from "screens/home";
import KanbanHomeworkDetails from "screens/kanban-homework-details";

const StudentRoutes: React.ReactNode[] = [
  <Route key="/" path="/" element={<Home />} />,
  <Route
    key="training-lectures"
    path="/training/:trainingId"
    element={<TrainingLectures />}
  />,
  <Route
    key="lecture"
    path="/training/:trainingId/:lectureId/:modalId?"
    element={<Lecture />}
  />,
];

const MentorRoutes: React.ReactNode[] = [
  <Route key="kanban" path="/kanban" element={<Kanban />} />,
  <Route
    key="kanban-homework-details"
    path="/kanban/:kanbanId"
    element={<KanbanHomeworkDetails />}
  />,
];

const ManagerRoutes: React.ReactNode[] = [
  <Route key="kanban" path="/kanban" element={<Kanban />} />,
  <Route
    key="kanban-homework-details"
    path="/kanban/:kanbanId"
    element={<KanbanHomeworkDetails />}
  />,
];

const MasterRoutes: React.ReactNode[] = [
  <Route key="kanban" path="/kanban" element={<Kanban />} />,
  <Route
    key="kanban-homework-details"
    path="/kanban/:kanbanId"
    element={<KanbanHomeworkDetails />}
  />,
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
  [UserRole.Master]: ManagerRoutes,
};
