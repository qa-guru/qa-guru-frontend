import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import Login from "./login";

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
