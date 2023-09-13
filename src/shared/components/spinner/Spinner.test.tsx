import { MemoryRouter } from "react-router-dom";
import Spinner from "./spinner";
import { render } from "../../../test/utils-test";

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
