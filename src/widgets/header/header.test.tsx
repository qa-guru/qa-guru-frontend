import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import Header from "./header";

describe("Header", () => {
  it("userRole is Student", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
