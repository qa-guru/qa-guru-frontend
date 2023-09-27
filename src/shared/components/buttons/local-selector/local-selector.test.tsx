import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import LocalSelector from "./local-selector";

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
