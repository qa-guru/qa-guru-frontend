import { MemoryRouter } from "react-router-dom";
import LectureContent from "./LectureContent";
import { render } from "../../../../test/utilsTest";
import { lectureContent } from "../../../../shared/mocks/letcureContentDto.mock";

describe("LectureContent", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureContent content={lectureContent} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
