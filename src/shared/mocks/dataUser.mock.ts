import { UserQuery, UserRole } from "../../../api/graphql/generated/graphql";

export const mockDataUser: UserQuery = {
  user: {
    id: "string",
    email: "string",
    firstName: "string",
    lastName: "string",
    middleName: "string",
    phoneNumber: "string",
    avatarLocation: "string",
    roles: [UserRole.Student],
    locked: false,
  },
};
