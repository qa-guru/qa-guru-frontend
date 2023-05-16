import { UserQuery } from "../../api/graphql/generated/graphql";

export const user: UserQuery = {
  user: {
    id: "string",
    email: "string",
    firstName: "string",
    lastName: "string",
    middleName: "string",
    phoneNumber: "string",
    avatarLocation: "string",
    roles: null,
    locked: false,
  },
};
