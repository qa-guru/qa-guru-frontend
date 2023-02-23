import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import Logout from "./Logout";

const mockLogout: any = () => {};

const mockSetAnchorElUser: any = () => {};

describe("Logout", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Logout logout={mockLogout} setAnchorElUser={mockSetAnchorElUser} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
