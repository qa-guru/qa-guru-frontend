import { MemoryRouter } from "react-router-dom";
import SkeletonLectureHomework from "./skeleton-lecture-homework";
import { render } from "../../../../test/utils-test";

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
