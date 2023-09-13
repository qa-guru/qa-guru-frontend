import {
  HomeWorksByLectureIdQuery,
  StudentHomeWorkStatus,
} from "../../api/graphql/generated/graphql";

export const homeWorksByLectureId: HomeWorksByLectureIdQuery = {
  homeWorksByLectureId: {
    offset: 0,
    limit: 1,
    totalElements: 7,
    items: [
      {
        id: "string",
        answer: "string",
        status: StudentHomeWorkStatus.Approved,
        creationDate: "2023-03-23",
        startCheckingDate: "2023-04-23",
        endCheckingDate: "2023-05-23",
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
    ],
  },
};
