import { MemoryRouter } from "react-router-dom";
import LectureHomework from "./LectureHomework";
import { render } from "../../../test/utilsTest";
import { lectureContent } from "../../mocks/letcureContentDto.mock";

describe("LectureHomework", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureHomework lectureHomeWork={lectureContent} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
