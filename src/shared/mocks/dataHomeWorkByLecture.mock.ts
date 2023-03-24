import {
  HomeWorkByLectureQuery,
  StudentHomeWorkStatus,
} from "../../../api/graphql/generated/graphql";

export const mockDataHomeWorkByLecture: HomeWorkByLectureQuery = {
  homeWorkByLecture: {
    id: "string",
    answer: "string",
    status: StudentHomeWorkStatus.Approved,
    creationDate: "2023-03-23",
    startCheckingDate: "2023-04-23",
    endCheckingDate: "2023-05-23",
    lecture: {
      id: "string",
      subject: "string",
    },
    student: {
      id: "string",
      firstName: "string",
      middleName: "string",
      lastName: "string",
    },
    mentor: {
      id: "string",
      firstName: "string",
      middleName: "string",
      lastName: "string",
    },
  },
};
