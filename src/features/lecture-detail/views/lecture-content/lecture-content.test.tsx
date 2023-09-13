import { MemoryRouter } from "react-router-dom";
import LectureContent from "./lecture-content";
import { render } from "../../../../test/utils-test";
import { lectureContentDto } from "../../../../shared/mocks/letcure-content-dto.mock";

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
