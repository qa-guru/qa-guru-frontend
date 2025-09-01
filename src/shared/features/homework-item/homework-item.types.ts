import {
  StudentHomeWorkStatus,
  TestGroupDto,
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
    } | null;
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
      email?: string | null;
      rating?: { __typename?: "RatingUserDto"; rating?: any | null } | null;
    } | null;
  } | null;
  hideMentorAndStudent?: boolean;
  testGroup?: TestGroupDto;
  trainingId?: string;
  lectureId?: string;
}
