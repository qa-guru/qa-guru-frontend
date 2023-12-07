import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import BlurredHomework from "./blurred-homework";

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
