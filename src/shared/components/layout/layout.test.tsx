import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import Layout from "./layout";

describe("Layout", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
