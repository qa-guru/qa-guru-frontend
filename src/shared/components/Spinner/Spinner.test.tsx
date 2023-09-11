import { MemoryRouter } from "react-router-dom";
import Spinner from "./Spinner";
import { render } from "../../../test/utilsTest";

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
