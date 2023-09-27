import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { lectureContentDto } from "shared/mocks/letcure-content-dto.mock";
import LectureContent from "./lecture-content";

describe("LectureContent", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureContent content={lectureContentDto} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
