import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import LectureDescription from "./lecture-description";

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
