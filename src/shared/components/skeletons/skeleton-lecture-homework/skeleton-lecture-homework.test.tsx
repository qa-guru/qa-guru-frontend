import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import SkeletonLectureHomework from "./skeleton-lecture-homework";

describe("SkeletonLectureHomework", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SkeletonLectureHomework />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
