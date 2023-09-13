import { MemoryRouter } from "react-router-dom";
import LectureHomework from "./lecture-homework";
import { render } from "../../../test/utils-test";
import { lectureContentDto } from "../../mocks/letcure-content-dto.mock";

describe("LectureHomework", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureHomework lectureHomeWork={lectureContentDto} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
