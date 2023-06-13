import {
  HomeWorksByLectureIdQuery,
  UserIdQuery,
} from "../../../../api/graphql/generated/graphql";

export interface IHomeworksOtherStudents {
  data: HomeWorksByLectureIdQuery;
  fetchMore: (params: {
    variables: { offset?: number };
    updateQuery: (
      prev: HomeWorksByLectureIdQuery,
      { fetchMoreResult }: { fetchMoreResult?: HomeWorksByLectureIdQuery | undefined }
    ) => HomeWorksByLectureIdQuery;
  }) => Promise<void>;  dataUserId: UserIdQuery;
}
