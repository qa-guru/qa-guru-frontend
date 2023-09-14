import { MemoryRouter } from "react-router-dom";
import Layout from "./layout";
import { render } from "../../../test/utils-test";
import { mockUserRole } from "../../mocks/user-role";

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
