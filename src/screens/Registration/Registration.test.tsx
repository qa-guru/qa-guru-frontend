import { MemoryRouter } from "react-router-dom";
import { render } from "../../test/utilsTest";
import Registration from "./Registration";

describe("Registration", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
