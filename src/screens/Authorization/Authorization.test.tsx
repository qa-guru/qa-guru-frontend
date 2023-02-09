import { MemoryRouter } from "react-router-dom";
import Authorization from "./Authorization";
import { render } from "../../test/utilsTest";

describe("Authorization", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Authorization />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
