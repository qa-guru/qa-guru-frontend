import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile";
import { render } from "../../../../../test/utilsTest";

describe("Profile", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Profile
          firstName="firstName"
          lastName="lastName"
          date="2021-10-10T10:10:10.000Z"
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
