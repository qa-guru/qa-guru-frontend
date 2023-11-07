import { UserRole } from "api/graphql/generated/graphql";
import { StyledLink } from "./roles.styled";

export const getHeaderByRole = (
  userRoles?: Array<UserRole | null> | null,
  t?: (key: string) => string
) => {
  const headerPages = [];

  if (userRoles?.includes(UserRole.Student)) {
    headerPages.push({
      title: <StyledLink to="/">{t && t("page.home")}</StyledLink>,
      pageURL: "/",
    });
  }

  if (
    userRoles?.some((role) =>
      [
        UserRole.Mentor,
        UserRole.Manager,
        UserRole.Master,
        UserRole.Student,
      ].includes(role || UserRole.Student)
    )
  ) {
    headerPages.push({
      title: <StyledLink to="/kanban">Доска заданий</StyledLink>,
      pageURL: "/kanban",
    });
  }

  return headerPages;
};
