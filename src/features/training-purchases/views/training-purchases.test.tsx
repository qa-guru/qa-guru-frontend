import { MemoryRouter } from "react-router-dom";
import TrainingPurchases from "./training-purchases";
import { render } from "../../../test/utils-test";
import { trainingPurchases } from "../../../shared/mocks/training-purchases.mock";

describe("TrainingPurchases", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <TrainingPurchases data={trainingPurchases} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
