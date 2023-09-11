import { MemoryRouter } from "react-router-dom";
import TrainingPurchases from "./TrainingPurchases";
import { render } from "../../../test/utilsTest";
import { trainingPurchases } from "../../../shared/mocks/trainingPurchases.mock";

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
