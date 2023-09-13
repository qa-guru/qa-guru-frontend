import { MemoryRouter } from "react-router-dom";
import BlurredComponent from "./blurred-component";
import { render } from "../../../../test/utils-test";

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
