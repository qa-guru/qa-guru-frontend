import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";
import { render } from "../../../test/utilsTest";

describe("Layout", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Layout userRoles={} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
