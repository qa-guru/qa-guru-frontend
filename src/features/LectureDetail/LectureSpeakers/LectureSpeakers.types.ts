export interface ILectureSpeakers {
  speakers: Array<{
    __typename?: "UserDto";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
  } | null> | null;
}
