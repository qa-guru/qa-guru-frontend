import { ReactElement } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  Edit,
  EmojiObjects,
  Group,
  Home,
  Leaderboard,
  Person,
  School,
  Star,
  ViewKanban,
  Stars,
} from "@mui/icons-material";

import { StyledBreadcrumb, StyledWrapper } from "./breadcrumbs.styled";

interface Breadcrumb {
  path: string;
  name: string;
  icon?: ReactElement;
}

const routePatterns = [
  {
    path: "/training/:trainingId",
    // eslint-disable-next-line sonarjs/no-duplicate-string
    name: "Список уроков",
    icon: <School fontSize="small" />,
  },
  {
    path: "/training/:trainingId/:lectureId",
    name: "Урок",
    icon: <EmojiObjects fontSize="small" />,
  },
  {
    path: "/kanban",
    name: "Доска заданий",
    icon: <ViewKanban fontSize="small" />,
  },
  {
    path: "/kanban-mentor",
    name: "Доска ментора",
    icon: <ViewKanban fontSize="small" />,
  },
  {
    path: "/kanban-student",
    name: "Доска студента",
    icon: <ViewKanban fontSize="small" />,
  },
  {
    path: "/kanban/:lectureId",
    // eslint-disable-next-line sonarjs/no-duplicate-string
    name: "Домашнее задание",
    icon: <School fontSize="small" />,
  },
  {
    path: "/kanban-mentor/:lectureId",
    name: "Домашнее задание",
    icon: <School fontSize="small" />,
  },
  {
    path: "/kanban-student/:lectureId",
    name: "Домашнее задание",
    icon: <School fontSize="small" />,
  },
  { path: "/profile", name: "Профиль", icon: <Person fontSize="small" /> },
  {
    path: "/profile/edit",
    name: "Редактирование",
    icon: <Edit fontSize="small" />,
  },
  { path: "/top-users", name: "Топ 50", icon: <Star fontSize="small" /> },
  {
    path: "/",
    name: "Курсы",
    icon: <School fontSize="small" />,
  },
  {
    path: "/edit-training/:trainingId",
    name: "Редактирование курса",
    icon: <Edit fontSize="small" />,
  },
  {
    path: "/edit-training/:trainingId/edit-lectures",
    name: "Список уроков",
    icon: <Edit fontSize="small" />,
  },
  {
    path: "/edit-training/:trainingId/edit-lectures/:lectureId",
    name: "Редактирование урока",
    icon: <Edit fontSize="small" />,
  },
  {
    path: "/users",
    name: "Пользователи",
    icon: <Group fontSize="small" />,
  },
  {
    path: "/statistics",
    name: "Статистика",
    icon: <Leaderboard fontSize="small" />,
  },
  {
    path: "/info-system",
    name: "Наша система",
    icon: <Stars fontSize="small" />,
  },
];

function CustomizedBreadcrumbs() {
  const location = useLocation();

  const breadcrumbs = routePatterns.reduce<Breadcrumb[]>(
    (acc, routePattern) => {
      const match = matchPath(
        { path: routePattern.path, end: false },
        location.pathname
      );

      if (match) {
        acc.push({
          path: match.pathname,
          name: routePattern.name,
          icon: routePattern.icon,
        });
      }
      return acc;
    },
    []
  );

  if (!breadcrumbs.length) return null;

  return (
    <StyledWrapper role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component={Link}
          to="/"
          label="Главная страница"
          icon={<Home fontSize="small" />}
        />
        {breadcrumbs.map((crumb, index) => (
          <StyledBreadcrumb
            key={`${crumb}-${index}`}
            component={Link}
            to={crumb.path}
            label={crumb.name}
            icon={crumb.icon}
          />
        ))}
      </Breadcrumbs>
    </StyledWrapper>
  );
}

export default CustomizedBreadcrumbs;
