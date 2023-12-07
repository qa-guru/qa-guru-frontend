import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import LectureTitle from "./lecture-title";

describe("LectureTitle", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureTitle title="Title" />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
