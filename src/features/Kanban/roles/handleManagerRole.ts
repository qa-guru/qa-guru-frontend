import { enqueueSnackbar } from "notistack";
import {
  UserRole,
  useUserRolesQuery,
} from "../../../api/graphql/generated/graphql";

export const handleManagerRole = () => {
  const { data } = useUserRolesQuery();
  const userRoles = data?.user?.roles;

  if (userRoles?.includes(UserRole.Manager)) {
    enqueueSnackbar("MANAGER не может поменять статус домашней работы");
  }
};
