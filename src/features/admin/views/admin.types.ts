import { UserRole, UsersQuery } from "api/graphql/generated/graphql";

export interface IAdmin {
  data: UsersQuery;
}

export interface IUser {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  phoneNumber: string | null;
  avatarLocation: string | null;
  roles: [UserRole] | null;
  locked: Boolean | null;
  creationDate: number | null;
  confirmationDate: number | null;
  updateDate: number | null;
}
