import { MemoryRouter } from "react-router-dom";
import LocalSelector from "./LocalSelector";
import { render } from "../../../../test/utilsTest";

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
