import { useLocation, Link, matchPath } from "react-router-dom";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

interface Breadcrumb {
  path: string;
  name: string;
}

const routePatterns = [
  { path: "/training/:trainingId", name: "Уроки" },
  { path: "/training/:trainingId/:lectureId", name: "Детализация урока" },
  { path: "/kanban", name: "Доска заданий" },
  { path: "/kanban/:lectureId", name: "Домашнее задание" },
  { path: "/profile", name: "Профиль" },
  { path: "/profile/edit", name: "Редактирование" },
  { path: "/top-users", name: "Топ 50" },
  { path: "/admin-panel", name: "Панель администратора" },
  { path: "/admin-panel/courses", name: "Курсы" },
  { path: "/admin-panel/users", name: "Пользователи" },
  { path: "/admin-panel/statistics", name: "Статистика" },
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
        });
      }
      return acc;
    },
    []
  );

  if (!breadcrumbs.length) return null;

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component={Link}
          to="/"
          label="Главная страница"
          icon={<HomeIcon fontSize="small" />}
        />
        {breadcrumbs.map((crumb, index) => (
          <StyledBreadcrumb
            key={index}
            component={Link}
            to={crumb.path}
            label={crumb.name}
          />
        ))}
      </Breadcrumbs>
    </div>
  );
}

export default CustomizedBreadcrumbs;
