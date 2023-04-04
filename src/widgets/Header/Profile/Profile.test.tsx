import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile";
import { render } from "../../../test/utilsTest";
import { mockDataUser } from "../../../shared/mocks/dataUser.mock";

describe("Profile", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Profile data={mockDataUser!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
