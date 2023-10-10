// import React from "react";
// import {
//   useHomeWorkByLectureQuery,
//   useUserIdQuery,
// } from "api/graphql/generated/graphql";
// import NoDataErrorMessage from "shared/components/no-data-error-message";
// import Spinner from "shared/components/spinner";
// import Homework from "../../../lecture-detail/views/homework";
//
// constants HomeworkByLectureContainer: React.FC = ({ lectureId }) => {
//   constants { data: dataUserId, loading: loadingUserId } = useUserIdQuery();
//
//   constants { data: dataHomeWorkByLecture, loading: loadingHomeWorkByLecture } =
//     useHomeWorkByLectureQuery({
//       variables: { lectureId: lectureId! },
//       fetchPolicy: "cache-first",
//     });
//
//   if (loadingUserId || loadingHomeWorkByLecture) return <Spinner />;
//   if (!dataHomeWorkByLecture || !dataUserId) return <NoDataErrorMessage />;
//
//   return (
//     <Homework
//       dataHomeWorkByLecture={dataHomeWorkByLecture.homeWorkByLecture!}
//       dataUserId={dataUserId!}
//     />
//   );
// };
//
// export default HomeworkByLectureContainer;
