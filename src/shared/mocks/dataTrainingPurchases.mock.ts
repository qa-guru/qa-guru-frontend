import { TrainingPurchasesQuery } from "../../api/graphql/generated/graphql";

export const mockDataTrainingPurchases: TrainingPurchasesQuery = {
  trainingPurchases: [
    {
      id: "string",
      user: {
        id: "string",
        email: "string",
        firstName: "string",
        lastName: "string",
        middleName: "string",
      },
      trainingTariff: {
        id: "string",
        name: "string",
        code: "string",
        price: 7,
        homeWork: false,
        description: "string",
        training: {
          id: "string",
          name: "string",
        },
      },
    },
  ],
};
