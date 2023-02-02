import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import TrainingPurchases from "./TrainingPurchases";
import { TrainingPurchasesQuery } from "../../../generated/graphql";

const mockData: TrainingPurchasesQuery = {
  __typename: "Query",
  trainingPurchases: [
    {
      __typename: "TrainingPurchaseDto",
      id: "string",
      user: {
        __typename: "UserDto",
        id: "string",
        email: "string",
        firstName: "string",
        lastName: "string",
        middleName: "string",
      },
      trainingTariff: {
        __typename: "TrainingTariffDto",
        id: "string",
        name: "string",
        code: "string",
        price: 7,
        homeWork: false,
        description: "string",
        training: {
          __typename: "TrainingDto",
          id: "string",
          name: "string",
        },
      },
    },
  ],
};

describe("TrainingPurchases", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <TrainingPurchases data={mockData!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
