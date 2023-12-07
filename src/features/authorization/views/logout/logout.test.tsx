import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import Logout from "./logout";

const mockLogout: any = () => {};
const mockSetAnchorElUser: any = () => {};

describe("Logout", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Logout logout={mockLogout} setAnchorElUser={mockSetAnchorElUser} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
