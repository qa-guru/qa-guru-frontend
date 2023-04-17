import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import { render } from "../../test/utilsTest";
import { UserRole } from "../../api/graphql/generated/graphql";

describe("Header", () => {
  it("userRole is Student", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Header userRoles={[UserRole.Student]} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("userRole is Mentor", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Header userRoles={[UserRole.Mentor]} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("userRole is Master", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Header userRoles={[UserRole.Master]} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
