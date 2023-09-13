import { MemoryRouter } from "react-router-dom";
import LectureDescription from "./lecture-description";
import { render } from "../../../../test/utils-test";

describe("LectureDescription", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDescription description={["string, string", "string"]} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
