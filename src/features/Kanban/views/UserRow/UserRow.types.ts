import React from "react";
import { UserDto } from "../../../../api/graphql/generated/graphql";

export interface IUserRow {
  icon: React.ComponentType;
  user: UserDto;
}
