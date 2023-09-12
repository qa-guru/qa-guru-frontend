import { MemoryRouter } from "react-router-dom";
import Header from "./header";
import { render } from "../../test/utils-test";
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
  it("userRole is MentorsContainer", () => {
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
