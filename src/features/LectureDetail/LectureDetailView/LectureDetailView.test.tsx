import { MemoryRouter } from "react-router-dom";
import LectureDetailView from "./LectureDetailView";
import { render } from "../../../test/utilsTest";
import { lecture } from "../../../shared/mocks/lecture.mock";
import { lectureHomework } from "../../../shared/mocks/lectureHomework.mock";

describe("LectureDetailView", () => {
  it("hasHomework is true", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDetailView
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
        <LectureDetailView
          dataLecture={lecture}
          dataLectureHomework={lectureHomework}
          tariffHomework={false}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
