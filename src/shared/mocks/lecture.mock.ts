import { LectureQuery } from "../../api/graphql/generated/graphql";

export const lecture: LectureQuery = {
  lecture: {
    id: "string",
    subject: "string",
    description: ["string1", "string2"],
    speakers: [
      {
        id: "string",
        firstName: "string",
        lastName: "string",
        middleName: "string",
      },
    ],
    homeWorkLevel: {
      id: "string",
      code: "string",
      description: "string",
      estimate: 7,
    },
    content: [
      {
        type: "string",
        value: "string",
        url: "string",
      },
    ],
  },
};
