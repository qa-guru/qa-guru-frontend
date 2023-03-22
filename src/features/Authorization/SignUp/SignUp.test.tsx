import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp";
import { render } from "../../../test/utilsTest";

const mockSignUp: any = () => {};

describe("SignUp", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SignUp signup={mockSignUp} isLoading={true} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("the component is not Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SignUp signup={mockSignUp} isLoading={false} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
