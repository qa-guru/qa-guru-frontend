// import React from "react";
// import {
//   useHomeWorkByLectureQuery,
//   useUserIdQuery,
// } from "api/graphql/generated/graphql";
// import NoDataErrorMessage from "shared/components/no-data-error-message";
// import Spinner from "shared/components/spinner";
// import Homework from "../../../lecture-detail/views/homework";
//
// const HomeworkByLectureContainer: React.FC = ({ lectureId }) => {
//   const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();
//
//   const { data: dataHomeWorkByLecture, loading: loadingHomeWorkByLecture } =
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
