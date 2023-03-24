import { CommentsHomeWorkByHomeWorkQuery } from "../../api/graphql/generated/graphql";

export const mockDataCommentsHomeWorkByHomeWork: CommentsHomeWorkByHomeWorkQuery =
  {
    commentsHomeWorkByHomeWork: {
      offset: 0,
      limit: 3,
      totalElements: 6,
      items: [
        {
          id: "string",
          creationDate: "2023-03-23",
          content: "string",
          creator: {
            id: "string",
            firstName: "string",
            middleName: "string",
            lastName: "string",
          },
          homeWork: {
            id: "string",
          },
        },
      ],
    },
  };
