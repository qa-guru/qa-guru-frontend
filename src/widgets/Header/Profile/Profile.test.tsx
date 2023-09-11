import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile";
import { render } from "../../../test/utilsTest";
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
