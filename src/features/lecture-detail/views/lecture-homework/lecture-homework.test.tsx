import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { lectureContentDto } from "shared/mocks/letcure-content-dto.mock";

import LectureHomework from "./lecture-homework";

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
