import { MemoryRouter } from "react-router-dom";
import SkeletonLectureHomework from "./SkeletonLectureHomework";
import { render } from "../../../../test/utilsTest";

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
