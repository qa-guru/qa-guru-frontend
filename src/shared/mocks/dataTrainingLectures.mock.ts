import { TrainingLecturesQuery } from "../../api/graphql/generated/graphql";

export const mockDataTrainingLectures: TrainingLecturesQuery = {
  trainingLectures: [
    {
      id: "string",
      number: 7,
      locking: false,
      lecture: {
        id: "string",
        subject: "string",
        description: ["string1", "string1"],
      },
      lastLecture: {
        id: "string",
        subject: "string",
        description: ["string1", "string1"],
      },
    },
  ],
};
