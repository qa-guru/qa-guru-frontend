import { Link } from "react-router-dom";
import { UserRole } from "../../../api/graphql/generated/graphql";
import { style } from "../styles";

export const getHeaderByRole = (
  userRoles: Array<UserRole | null>,
  t: (key: string) => string
) => {
  const headerPages = [];

  if (userRoles.includes(UserRole.Student)) {
    headerPages.push({
      title: (
        <Link style={style.link} to="/">
          {t("page.home")}
        </Link>
      ),
      pageURL: "/",
    });
  }

  if (
    userRoles.some((role) =>
      [UserRole.Mentor, UserRole.Manager, UserRole.Master].includes(
        role || UserRole.Student
      )
    )
  ) {
    headerPages.push({
      title: (
        <Link style={style.link} to="/kanban">
          Доска заданий
        </Link>
      ),
      pageURL: "/kanban",
    });
  }

  return headerPages;
};
