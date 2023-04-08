import { MemoryRouter } from "react-router-dom";
import LectureDescription from "./LectureDescription";
import { render } from "../../../../../test/utilsTest";

describe("LectureDescription", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDescription description={["string, string", "string"]} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
