import { MemoryRouter } from "react-router-dom";
import LocalSelector from "./local-selector";
import { render } from "../../../../test/utils-test";

describe("LocalSelector", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LocalSelector />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
