import { MemoryRouter } from "react-router-dom";
import LectureContent from "./LectureContent";
import { render } from "../../../../test/utilsTest";
import { lectureContentDto } from "../../../../shared/mocks/letcureContentDto.mock";

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
