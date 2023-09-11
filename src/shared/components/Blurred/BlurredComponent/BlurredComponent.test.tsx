import { MemoryRouter } from "react-router-dom";
import BlurredComponent from "./BlurredComponent";
import { render } from "../../../../test/utilsTest";

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
