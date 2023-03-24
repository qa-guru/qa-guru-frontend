import { MemoryRouter } from "react-router-dom";
import TrainingPurchases from "./TrainingPurchases";
import { render } from "../../test/utilsTest";
import { mockDataTrainingPurchases } from "../../shared/mocks/dataTrainingPurchases.mock";

describe("TrainingPurchases", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <TrainingPurchases data={mockDataTrainingPurchases!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
