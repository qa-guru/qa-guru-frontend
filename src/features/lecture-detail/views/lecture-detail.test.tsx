import { MemoryRouter } from "react-router-dom";
import LectureDetail from "./lecture-detail";
import { render } from "../../../test/utils-test";
import { lecture } from "../../../shared/mocks/lecture.mock";
import { lectureHomework } from "../../../shared/mocks/lecture-homework.mock";

describe("LectureDetail", () => {
  it("hasHomework is true", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDetail
          dataLecture={lecture}
          dataLectureHomework={lectureHomework}
          tariffHomework={true}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("hasHomework is false", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDetail
          dataLecture={lecture}
          dataLectureHomework={lectureHomework}
          tariffHomework={false}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
