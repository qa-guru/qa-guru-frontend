import { UserRole } from "api/graphql/generated/graphql";
import { useTranslation } from "react-i18next";

import { StyledLink } from "./roles.styled";

const getHeaderByRole = (userRoles: (UserRole | null)[] | null | undefined) => {
  const { t } = useTranslation();
  const headerPages = [];

  if (userRoles?.includes(UserRole.Student)) {
    headerPages.push({
      title: <StyledLink to="/">{t("page.home")}</StyledLink>,
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
      ].includes(role!)
    )
  ) {
    headerPages.push({
      title: <StyledLink to="/kanban">Доска заданий</StyledLink>,
      pageURL: "/kanban",
    });
  }

  return headerPages;
};

export default getHeaderByRole;
