import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import Header from "./Header";

describe("Header", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
