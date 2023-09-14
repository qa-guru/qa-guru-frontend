import { MemoryRouter } from "react-router-dom";
import ButtonTrainingList from "./button-training-list";
import { render } from "../../../../test/utils-test";

describe("ButtonTrainingList", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ButtonTrainingList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
