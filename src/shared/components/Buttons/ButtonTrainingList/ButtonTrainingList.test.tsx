import { MemoryRouter } from "react-router-dom";
import ButtonTrainingList from "./ButtonTrainingList";
import { render } from "../../../../test/utilsTest";

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
