import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { UserRole } from "api/graphql/generated/graphql";
import PersonIcon from "@mui/icons-material/Person";

const getProfileByRole = (
  userRoles: (UserRole | null)[] | null | undefined
) => {
  const settings = [
    {
      title: "Профиль",
      icon: <PersonIcon />,
      url: "/profile",
    },
  ];

  if (userRoles?.includes(UserRole.Admin)) {
    settings.push({
      title: "Пользователи",
      icon: <SupervisorAccountIcon />,
      url: "/admin",
    });
  }

  console.log(settings);

  return settings;
};

export default getProfileByRole;
