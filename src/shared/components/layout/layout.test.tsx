import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { mockUserRole } from "shared/mocks/user-role";

import Layout from "./layout";

describe("Layout", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Layout userRoles={mockUserRole} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
