import { MemoryRouter } from "react-router-dom";
import NoDataErrorMessage from "./NoDataErrorMessage";
import { render } from "../../../test/utilsTest";

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
