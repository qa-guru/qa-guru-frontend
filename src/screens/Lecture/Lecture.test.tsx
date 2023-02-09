import { MemoryRouter } from "react-router-dom";
import { render } from "../../test/utilsTest";
import Lecture from "./Lecture";

describe("Lecture", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Lecture />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
