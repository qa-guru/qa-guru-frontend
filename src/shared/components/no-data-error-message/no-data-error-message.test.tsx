import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import NoDataErrorMessage from "./no-data-error-message";

describe("NoDataErrorMessage", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <NoDataErrorMessage />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
