import {
  UserQuery,
  StudentHomeWorkStatus,
  TechStack,
} from "api/graphql/generated/graphql";

export interface IHomeworkItem {
  dataHomeWorkByLectureAndTraining?: {
    __typename?: "StudentHomeWorkDto";
    id?: string | null;
    answer?: string | null;
    status?: StudentHomeWorkStatus | null;
    creationDate?: any | null;
    startCheckingDate?: any | null;
    endCheckingDate?: any | null;
    lecture?: {
      __typename?: "LectureInfoDto";
      id?: string | null;
      subject?: string | null;
      description?: Array<string | null> | null;
      contentHomeWork?: Array<{
        __typename?: "LectureContentHomeWorkDto";
        url?: string | null;
        value?: string | null;
        type?: string | null;
      } | null> | null;
    } | null;
    training?: { __typename?: "TrainingDto"; techStack: TechStack } | null;
    student?: {
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      avatar?: string | null;
      lastName?: string | null;
      rating?: { __typename?: "RatingUserDto"; rating?: any | null } | null;
    } | null;
    mentor?: {
      __typename?: "UserDto";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      avatar?: string | null;
      lastName?: string | null;
      rating?: { __typename?: "RatingUserDto"; rating?: any | null } | null;
    } | null;
  } | null;
  dataUserId: UserQuery;
  hideMentorAndStudent?: boolean;
}
