import { MemoryRouter } from "react-router-dom";
import Logout from "./logout";
import { render } from "../../../../test/utils-test";

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
