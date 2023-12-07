import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import Spinner from "./spinner";

describe("Spinner", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Spinner />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
