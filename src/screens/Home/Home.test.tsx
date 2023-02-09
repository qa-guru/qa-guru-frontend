import { MemoryRouter } from "react-router-dom";
import { render } from "../../test/utilsTest";
import Home from "./Home";

describe("Home", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
