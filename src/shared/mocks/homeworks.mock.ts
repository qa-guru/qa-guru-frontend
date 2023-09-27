import {
  HomeWorksQuery,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";

export const homeWorksQuery: HomeWorksQuery = {
  homeWorks: {
    offset: 0,
    limit: 3,
    totalElements: 6,
    items: [
      {
        id: "string",
        answer: "string",
        status: StudentHomeWorkStatus.Approved,
        lecture: {
          id: "string",
          subject: "string",
          description: ["string", "string"],
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
    ],
  },
};
