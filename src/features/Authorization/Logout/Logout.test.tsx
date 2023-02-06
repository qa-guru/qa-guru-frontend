import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import Logout from "./Logout";

const mockLogout: any = () => {};

const mockSetAnchorElUser: any = () => {};

describe("Logout", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Logout
          logout={mockLogout}
          isLoading={true}
          setAnchorElUser={mockSetAnchorElUser}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("the component is not Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Logout
          logout={mockLogout}
          isLoading={false}
          setAnchorElUser={mockSetAnchorElUser}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
