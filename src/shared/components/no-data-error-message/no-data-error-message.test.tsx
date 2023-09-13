import { MemoryRouter } from "react-router-dom";
import NoDataErrorMessage from "./no-data-error-message";
import { render } from "../../../test/utils-test";

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
