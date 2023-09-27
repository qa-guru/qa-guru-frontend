import { TechStack, TrainingDto } from "api/graphql/generated/graphql";

export const trainingDto: TrainingDto = {
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
};
