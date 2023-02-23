import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { render } from "../../../test/utilsTest";

const mockLogin: any = () => {};

describe("Login", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Login login={mockLogin} isLoading={true} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("the component is not Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Login login={mockLogin} isLoading={false} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
