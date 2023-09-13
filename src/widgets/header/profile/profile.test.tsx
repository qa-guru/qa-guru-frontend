import { MemoryRouter } from "react-router-dom";
import Profile from "./profile";
import { render } from "../../../test/utils-test";
import { user } from "../../../shared/mocks/user.mock";

describe("Profile", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Profile data={user} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
