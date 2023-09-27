import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { trainingPurchases } from "shared/mocks/training-purchases.mock";
import TrainingPurchases from "./training-purchases";

describe("TrainingPurchases", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <TrainingPurchases data={trainingPurchases} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
