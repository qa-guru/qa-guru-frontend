import { MemoryRouter } from "react-router-dom";
import BlurredHomework from "./BlurredHomework";
import { render } from "../../../../test/utilsTest";

describe("BlurredHomework", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <BlurredHomework />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
