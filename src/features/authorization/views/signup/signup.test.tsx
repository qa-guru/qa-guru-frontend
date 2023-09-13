import { MemoryRouter } from "react-router-dom";
import Signup from "./signup";
import { render } from "../../../../test/utils-test";

const mockSignUp: any = () => {};

describe("SignUp", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Signup signup={mockSignUp} isLoading={true} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("the component is not Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Signup signup={mockSignUp} isLoading={false} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
