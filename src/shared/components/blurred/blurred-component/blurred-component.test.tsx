import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import BlurredComponent from "./blurred-component";

describe("BlurredComponent", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <BlurredComponent>
          <div>Sample content</div>
        </BlurredComponent>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
