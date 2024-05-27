import { Maybe, UserRole } from "api/graphql/generated/graphql";

export const formatRole = (roles: Maybe<Maybe<UserRole>[]> | undefined) => {
  if (!roles || roles.length === 0) return "";

  const formattedRoles: string[] = [];

  roles.forEach((role) => {
    if (role) {
      switch (role) {
        case "ADMIN":
          formattedRoles.push("Админ");
          break;
        case "LECTOR":
          formattedRoles.push("Преподаватель");
          break;
        case "MENTOR":
          formattedRoles.push("Ментор");
          break;
        case "STUDENT":
          formattedRoles.push("Студент");
          break;
        default:
          break;
      }
    }
  });

  return formattedRoles.join(", ");
};
