import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";
import { render } from "../../../test/utilsTest";
import { mockUserRole } from "../../mocks/userRole";

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
