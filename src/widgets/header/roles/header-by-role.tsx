import { StyledLink } from "./roles.styled";
import { UserRole } from "../../../api/graphql/generated/graphql";

export const getHeaderByRole = (
  userRoles: Array<UserRole | null>,
  t: (key: string) => string
) => {
  const headerPages = [];

  if (userRoles.includes(UserRole.Student)) {
    headerPages.push({
      title: <StyledLink to="/">{t("page.home")}</StyledLink>,
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
      title: <StyledLink to="/kanban">Доска заданий</StyledLink>,
      pageURL: "/kanban",
    });
  }

  return headerPages;
};
