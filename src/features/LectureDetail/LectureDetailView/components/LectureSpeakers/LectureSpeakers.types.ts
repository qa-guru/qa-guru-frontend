import { UserDto } from "../../../../../api/graphql/generated/graphql";

export interface ILectureSpeakers {
  speakers: (UserDto | null | undefined)[];
}
