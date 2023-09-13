import { MemoryRouter } from "react-router-dom";
import BlurredHomework from "./blurred-homework";
import { render } from "../../../../test/utils-test";

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
