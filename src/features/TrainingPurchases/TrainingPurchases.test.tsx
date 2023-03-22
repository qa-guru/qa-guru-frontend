import { MemoryRouter } from "react-router-dom";
import TrainingPurchases from "./TrainingPurchases";
import { render } from "../../test/utilsTest";
import { TrainingPurchasesQuery } from "../../api/graphql/generated/graphql";

const mockData: TrainingPurchasesQuery = {
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
