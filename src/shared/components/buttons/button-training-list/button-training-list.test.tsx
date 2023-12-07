import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import ButtonTrainingList from "./button-training-list";

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
