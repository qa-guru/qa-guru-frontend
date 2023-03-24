import { MemoryRouter } from "react-router-dom";
import Logout from "./Logout";
import { render } from "../../../test/utilsTest";

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
