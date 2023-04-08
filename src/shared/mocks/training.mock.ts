import { TechStack, TrainingQuery } from "../../api/graphql/generated/graphql";

export const training: TrainingQuery = {
  training: {
    id: "string",
    name: "string",
    content: "string",
    techStack: TechStack.Java,
    tariffs: [
      {
        id: "string",
        name: "string",
        code: "string",
        price: 7,
        homeWork: true,
        description: "string",
      },
    ],
    mentors: [
      {
        id: "string",
        firstName: "string",
        lastName: "string",
        middleName: "string",
      },
    ],
  },
};
